const express = require('express');
const router = express.Router();

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/', Auth,  multer, CommentCtrl.createComment);
router.get('/:id', Auth, multer, CommentCtrl.getAllComment);
router.get('/:id',Auth,  multer, CommentCtrl.getOneComment);

module.exports = router