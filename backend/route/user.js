const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


// routes pour l'inscription et la connexion //
router.use('/signup', userCtrl.signup);
router.get('/login', userCtrl.login);
router.get('/:id', userCtrl.connect);

module.exports = router;