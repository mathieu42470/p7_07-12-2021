const express = require('express');
const router = require('./message');

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/:id/comment', Auth, multer, CommentCtrl.createComment);
router.get('/:id/comment', Auth, multer, CommentCtrl.getAllComment);
router.get('/:id/comment/:id', Auth, multer, CommentCtrl.getOneComment);
router.put('/:id/comment/:id', Auth, multer, CommentCtrl.modifyComment);
router.delete('/:id/comment/:id', Auth, multer, CommentCtrl.deleteComment);
router.post('/:id/comment/:id/like', Auth, CommentCtrl);

module.exports = router