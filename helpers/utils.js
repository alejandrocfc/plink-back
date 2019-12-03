const JWT = require('jsonwebtoken');
const Axios = require('axios');
const {ApiKey} = require("./constants");

Axios.defaults.baseURL = 'https://bravenewcoin-v1.p.rapidapi.com/';
Axios.defaults.headers.common['X-RapidAPI-Key'] = ApiKey;

/**
 * Middleware: Verificar que el Token aún esté vivo
 * @param req
 * @param res
 * @param next
 */
function checkJWT(req, res, next){
    const token = req.headers['authorization'];
    // verifies secret and checks expiration time
    JWT.verify(token, 'plink', (err, decoded) => {
        if (err)
            return next(err);
        else {
            req.userId = decoded.id;
            return next(); // call next function, req and res will be available to it
        }
    });
}

/**.
 * Crea Token con tiempo de vida: 2 minutos
 * @param username → Nombre de usuario
 * @param id → Identificador del usuario (PK)
 * @returns JWT Firmado
 */
function signJWT(username, id){
    return JWT.sign({ username, id }, "plink", { expiresIn: "10m" });
}

/**
 * Con el list enviado, se mapea y se hace una petición para recoger el valor con respecto a la moneda del usuario
 * @param list → Listado de criptomonedas del usuario
 * @param currency → Moneda preferida del usuario
 * @returns Listado de items de forma {name,price,source}
 */
function parseCoin(list,currency) {
    return new Promise((resolve, reject) => {
        const items = [];
        Axios.all(list.map(({name}) => {
            return Axios.get(`convert?qty=1&from=${name}&to=${currency}`)
                .then(({data})=> {
                    if(data.success){
                        return items.push({name:data.from_name,source:data.source,price:data.to_quantity})
                    }else{
                        return reject({message:data.error})
                    }
                });
        })).then(()=>{
            resolve(items)
        }).catch(e=>reject(handleReqError(e)));
    })
}

/**
 * Parseo de error en petición de parseCoin
 * @param error → Error de petición a BraveNew Coin
 */
function handleReqError(error){
    const info = {};
    if (error.response) {
        info.status = error.response.status;
        info.message = error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data);
    } else if (error.request) {
        console.log(error.request);
        info.status = 700;
        info.message = 'Network Error';
    } else {
        info.status = 800;
        info.message = error.message;
    }
    return info

}

/**
 * Se revisa si la Criptomoneda existe
 * @param name → Nombre de la criptomenda para guardar
 * @returns Booleano si la criptomoneda existe
 */
function checkCripto(name){
    return Axios.get(`ticker?coin=${name}`)
        .then(({data})=> data.success);
}

/**
 * Desde el listado, ordena de acuerdo al parametro por precio y saca los tres primeros
 * @param list → Array
 * @param order → ASC o DESC
 * @returns Array
 */
function orderList(list, order){
    const sort = list.sort((a, b) => order === 'ASC' ? a.price - b.price : b.price - a.price);
    return sort.slice(0, 3);
}

module.exports = {checkJWT, signJWT, parseCoin, checkCripto, orderList};
