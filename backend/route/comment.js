const express = require('express');
const router = require('./post');

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/:id/comment',  multer, CommentCtrl.createComment);
router.get('/:id/comment', multer, CommentCtrl.getAllComment);
router.get('/:id/comment/:id',  multer, CommentCtrl.getOneComment);
router.put('/:id/comment/:id', multer, CommentCtrl.modifyComment);
router.delete('/:id/comment/:id',  multer, CommentCtrl.deleteComment);
router.post('/:id/comment/:id/like',  CommentCtrl.likeComment);

module.exports = router