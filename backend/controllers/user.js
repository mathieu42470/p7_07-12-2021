const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = require('../models/user');

// inscription des utilisateurs dans la base de donnée //

exports.signup =(req, res, next) => {
               bcrypt.hash(req.body.password, 10)
               .then(hash =>{
                              const user = new user({
                                             firstName: req.body.firstName,
                                             lastName: req.body.lastName,
                                             email: req.body.email,
                                             password: hash
                              });
                              user.save()
                              .then(()=> res.status(201).json({message: "utilisateur crée"}))
                              .catch(error => res.status(400).json({error}));
               })
               .catch(error => res.status(500).json({error}));
};

// connexion avec son mail et son mot de passe //

exports.login = (req, res, next) =>{
               user.findOne({email: req.body.email})
               .then(user =>{
                              if(!user){
                                             return res.status(401).json({error:'utilisateur non trouvé'});
                              }
                              bcrypt.compare(req.body.password, user.password)
                              .then(valid =>{
                                             if(!valid){
                                                            return res.status(401).json({error: 'mot de passe incorrect !'});
                                             }
                                             res.status(200).json({
                                                            user: user._id,
                                                            token: jwt.sign(
                                                                           {userId: user_id},
                                                                           process.env.JWT,
                                                                           {expiresIn: '24h'}
                                                            )
                                             });
                              })
                              .catch(error => res.status(500).json({ error}));
               })
              .catch(error => res.status(500).json({ error}));
}