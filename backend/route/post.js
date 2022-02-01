const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les messages envoyer par les utilisateurs //

router.post('/', multer, postCtrl.createPost );
router.get('/',  multer, postCtrl.getAllPost);
router.get('/:id',  multer, postCtrl.getOnepost);
router.put('/', multer, postCtrl.modifyPost);
router.delete('/:id_post', multer, postCtrl.deletePost);
router.post('/like', postCtrl.likePost);

module.exports = router;