const Criptos = require('../models').Criptos;
const UsersCtrl = require('./users');
const {criptoSchema} = require("../helpers/constants");
const {parseCoin, checkCripto, orderList} = require("../helpers/utils");


const create = async (req, res, next) => {
    const {error} = criptoSchema.validate(req.body);
    if(error) return next(error);
    const check = await checkCripto(req.body.name);
    if(!check) return next(`La Criptomoneda ${req.body.name} no existe en el listado de BraveNew Coin`);
    return Criptos.create({
        name: req.body.name,
        userId: req.userId
    })
        .then(snap => res.status(201).send("Created"))
        .catch(error => next(error));
};

const mine = async (req, res, next) => {
    try {
        const user = await UsersCtrl.checkUser(req.userId);
        if (!user) return next("User not found!");
        return Criptos
            .findAll({where: {userId: req.userId}})
            .then(async snap => {
                try {
                    const list = await parseCoin(snap, user.currency);
                    return res.status(200).json(list);
                } catch (e) {
                    return res.status(401).json({success: false, message: e.message})
                }
            })
            .catch(error => next(error));
    }catch (error) {
        next(error)
    }
};

const top = async (req, res, next) => {
    try{
        let order = req.query.order;
        if(!order || !order.match('^(ASC|DESC)$')) order = "DESC";
        const user = await UsersCtrl.checkUser(req.userId);
        if(!user) return next("User not found!");
        return Criptos
            .findAll({where: {userId:req.userId}})
            .then(async snap => {
                try {
                    const list = await parseCoin(snap, user.currency);
                    return res.status(200).json(orderList(list, order));
                }
                catch (e) {
                    return next(e)
                }
            })
            .catch(error => next(error));
    }catch (error) {
        next(error)
    }
};

module.exports = {create, mine, top};
