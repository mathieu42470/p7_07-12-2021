const express = require('express');
const router = require('./post');

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/comment',  multer, CommentCtrl.createComment);
router.get('/comment', multer, CommentCtrl.getAllComment);
router.get('/comment/:id',  multer, CommentCtrl.getOneComment);
router.put('/comment', multer, CommentCtrl.modifyComment);
router.delete('/comment/:id_commentaire',  multer, CommentCtrl.deleteComment);

module.exports = router