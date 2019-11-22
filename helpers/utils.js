const JWT = require('jsonwebtoken');

function checkJWT(req, res, next){
    const token = req.headers['authorization'];
    // verifies secret and checks expiration time
    JWT.verify(token, 'plink', (err, decoded) => {
        if (err)
            return res.json({ success: false, message: 'Failed to authenticate token' });
        else {
            req.userId = decoded.id;
            return next(); // call next function, req and res will be available to it
        }
    });
}

function signJWT(username, id){
    //Create token expires in 2 min
    return JWT.sign({ username, id }, "plink", { expiresIn: "2m" });
}

function parseCoin(list) {
    return list.map(({name,price,source})=>({name,price,source}))
}

module.exports = {checkJWT, signJWT, parseCoin};
