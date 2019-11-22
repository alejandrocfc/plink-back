const Criptos = require('../models').Criptos;
const {criptoSchema} = require("../helpers/constants");
const {parseCoin} = require("../helpers/utils");

module.exports = {
    create(req, res) {
        const {error} = criptoSchema.validate(req.body);
        if(error) return res.status(400).send(error);
        return Criptos.create({
            name: req.body.name,
            price: req.body.price,
            source: req.body.source,
            userId: req.userId
        })
            .then(snap => res.status(201).send("Created"))
            .catch(error => res.status(400).send(error));
    },
    mine(req, res) {
        let order = req.query.order;
        if(!order || !order.match('^(ASC|DESC)$')) order = "ASC";
        return Criptos
            .findAll({where: {userId:req.userId}, order: [['price',order]]})
            .then(snap => {
                const list = parseCoin(snap);
                return res.status(200).json(list);
            })
            .catch(err => (res.status(400).send(err)))
    },
    top(req, res) {
        return Criptos
            .findAll({where: {userId:req.userId}, order: [['price','DESC']], limit: 3})
            .then(snap => {
                const list = parseCoin(snap);
                return res.status(200).json(list);
            })
            .catch(err => (res.status(400).send(err)))
    }
};
