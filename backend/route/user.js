const express = require('express');
const multer = require('multer');
const router = express.Router();

const userCtrl = require('../controllers/user');


// routes pour l'inscription et la connexion //
router.use('/signup', userCtrl.signup);
router.post('login', userCtrl.login);

module.exports = router;