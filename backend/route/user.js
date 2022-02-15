const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


// routes pour l'inscription et la connexion //
router.post('/signup', userCtrl.signup);
router.get('/login', userCtrl.login);
router.get('/:id', userCtrl.connect);

module.exports = router;