const express = require('express');
const multer = require('multer');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les messages envoyer par les utilisateurs //

router.post('/', Auth, multer, messageCtrl.createMessage );
router.get('/', Auth, multer, messageCtrl.getAllMessage);
router.get('/:id', Auth, multer, messageCtrl.getOneMessage);
router.post('/:id/like', Auth, messageCtrl);

module.exports = router;