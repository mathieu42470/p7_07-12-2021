const express = require('express');
const router = require('./post');

const CommentCtrl = require('../controllers/comment');
const Auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//routes pour les commentaires des utilisateurs //
router.post('/:id/comment',  multer, CommentCtrl.createComment);
router.get('/:id/comment', multer, CommentCtrl.getAllComment);
router.get('/:id/comment/',  multer, CommentCtrl.getOneComment);
router.put('/:id/comment/', multer, CommentCtrl.modifyComment);
router.delete('/:id/comment/',  multer, CommentCtrl.deleteComment);

module.exports = router