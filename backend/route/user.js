const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


// routes pour l'inscription et la connexion et la suppression de compte //
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id',auth ,userCtrl.deleteUser);

module.exports = router;