const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les messages envoyer par les utilisateurs //

router.post('/', Auth, multer, postCtrl.createPost );
router.get('/',Auth, multer, postCtrl.getAllPost);
router.get('/:id_post', Auth, multer, postCtrl.getOnepost);
router.put('/',Auth, multer, postCtrl.modifyPost);
router.delete('/:id_post', Auth, multer, postCtrl.deletePost);
router.post('/like',Auth, postCtrl.likePost);

module.exports = router;