const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/user');

const db = require('../MysqlParam')







// inscription des utilisateurs dans la base de donnée //

exports.signup =(req, res, next) => {
               bcrypt.hash(req.body.password, 10)
               .then(hash =>{
               
                              // const user = new user({
                              //                firstName: req.body.firstName,
                              //                lastName: req.body.lastName,
                              //                email: req.body.email,
                              //                password: hash
                              // });
                              db.query("Select * From user",(error,resultat) =>{
                                             if(error){
                                               return res.status(400).json('error')
                                             }
                                             return res.status(200).json({message : resultat})
                                           })                             
                             
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
                                             db.query("Select * From user",(error,resultat) =>{
                                              if(error){
                                                return res.status(400).json('error')
                                              }
                                              return res.status(200).json({message : resultat})
                                            })    
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