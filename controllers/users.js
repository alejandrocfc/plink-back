const Users = require('../models').Users;
const {userSchema} = require("../helpers/constants");
const  {signJWT} = require("../helpers/utils");

const create = (req, res) => {
    const {error} = userSchema.validate(req.body);
    if(error) return res.status(400).send(error);
    return Users.create({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        currency: req.body.currency
    })
        .then(user => res.status(201).send("Created"))
        .catch(error => {
            res.status(401).json({ success:false, message: error })
        });
};

const login = (req, res) => {
    const {username,password} = req.body;
    if(!username || !password) return res.status(400).send({success:false, message: "Please send an username and a password"});
    return Users
        .findOne({where: {username,password}})
        .then(user => {
            if(!user) return res.status(404).send({success:false, message:"User not found!"});
            const token = signJWT(user.username, user.id);
            return res.status(200).send(token);
        })
        .catch(error => res.status(401).json({ success:false, code: error.original.errno, message: error }));
};

const checkUser = (id) => new Promise((resolve, reject) => {
    Users
        .findByPk(id)
        .then(user => {
            if (!user) reject();
            resolve(user);
        })
        .catch(error => reject(error));
});

module.exports = {create, login, checkUser};
