const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les messages envoyer par les utilisateurs //

router.post('/', Auth, multer, postCtrl.createPost );
router.get('/', Auth, multer, postCtrl.getAllPost);
router.get('/:id', Auth, multer, postCtrl.getOnepost);
router.put('/:id', Auth, multer, postCtrl.modifyPost);
router.delete('/:id', Auth, multer, postCtrl.deletePost);
router.post('/:id/like', Auth, postCtrl.likePost);

module.exports = router;