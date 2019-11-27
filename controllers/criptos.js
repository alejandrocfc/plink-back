const Criptos = require('../models').Criptos;
const Users = require('../models').Users;
const {criptoSchema} = require("../helpers/constants");
const {parseCoin, checkCripto} = require("../helpers/utils");


const create = async (req, res) => {
    const {error} = criptoSchema.validate(req.body);
    if(error) return res.status(401).send(error);
    const check = await checkCripto(req.body.name);
    if(!check) return res.status(401).json({
        success: false,
        message: `La Criptomoneda ${req.body.name} no existe en el listado de BraveNew Coin`
    });
    return Criptos.create({
        name: req.body.name,
        userId: req.userId
    })
        .then(snap => res.status(201).send("Created"))
        .catch(error => res.status(401).json({
            success: false,
            code: error.original.errno,
            message: error.original.sqlMessage
        }));
};

module.exports = {
    create,
    mine(req, res) {
        return Users
            .findByPk(req.userId)
            .then(user => {
                if(!user) return res.status(404).send("User not found!");
                return Criptos
                    .findAll({where: {userId:req.userId}})
                    .then(async snap => {
                        try{
                            const list = await parseCoin(snap, user.currency);
                            return res.status(200).json(list);
                        }catch (e) {
                            return res.status(401).json({ success:false, message: e.message })
                        }
                    })
                    .catch(error => res.status(401).json({ success:false, code: error.original.errno, message: error.original.sqlMessage }));
            })
            .catch(error => res.status(401).json({ success:false, code: error.original.errno, message: error.original.sqlMessage }));
    },
    top(req, res) {
        let order = req.query.order;
        if(!order || !order.match('^(ASC|DESC)$')) order = "ASC";
        return Criptos
            .findAll({where: {userId:req.userId}})
            .then(snap => {
                const list = parseCoin(snap);
                return res.status(200).json(list);
            })
            .catch(error => res.status(401).json({ success:false, code: error.original.errno, message: error.original.sqlMessage }));
    }
};
