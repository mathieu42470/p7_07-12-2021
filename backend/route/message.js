const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les messages envoyer par les utilisateurs //

router.post('/', Auth, multer, messageCtrl.createMessage );
router.get('/', Auth, multer, messageCtrl.getAllMessage);
router.get('/:id', Auth, multer, messageCtrl.getOneMessage);
router.put('/:id', Auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', Auth, multer, messageCtrl.deleteMessage);
router.post('/:id/like', Auth, messageCtrl.likeMessage);

module.exports = router;