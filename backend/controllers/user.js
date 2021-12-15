const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// inscription des utilisateurs dans la base de donnée //

exports.signup =(req, res, next) => {
               bcrypt.hash(req.body.password, 10)
}