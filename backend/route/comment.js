const express = require('express');
const multer = require('multer');
const router = require('./message');


//routes pour les commentaires des utilisateurs //
router.post('/post/:id/comment');

module.exports = router