const express = require('express');
const router = express.Router();

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/',  multer, CommentCtrl.createComment);
router.get('/:id', multer, CommentCtrl.getAllComment);
router.get('/:id',  multer, CommentCtrl.getOneComment);
router.put('/', multer, CommentCtrl.modifyComment);
router.delete('/:id_commentaire',  multer, CommentCtrl.deleteComment);

module.exports = router