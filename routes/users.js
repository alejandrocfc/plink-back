const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.route('/')
    .get((req, res) =>  (res.send('Welcome to users routes !!!')))
    .post( UsersController.create );

router.post('/login',  UsersController.login);

module.exports = router;
