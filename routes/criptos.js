const express = require('express');
const router = express.Router();
const CriptosController = require('../controllers/criptos');
const {checkJWT} = require("../helpers/utils");

router.route('/')
    .get((req, res) =>  (res.send('Welcome to cripto routes !!!')))
    .post( checkJWT, CriptosController.create );

router.get('/mine', checkJWT,  CriptosController.mine);
router.get('/top', checkJWT,  CriptosController.top);

module.exports = router;
