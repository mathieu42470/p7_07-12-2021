const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/user');

const db = require('../MysqlParam')

//  const email = req.body.email; 
//                  const firstName = req.body.firstname; 
//                  const lastName = req.body.lastname; 
//                  const password = req.body.password; 

// inscription des utilisateurs dans la base de donnée //

exports.signup =(req, res, next) => {
               bcrypt.hash(req.body.password, 10)
               .then(hash=>{ 
                        db.query (`INSERT * into user (email, password, firstname, lastname)
                        values(?,?,?,?)`,(err,res,next)=>{
                          if(err){
                            return console.error(err.message);
                          }
                          console.log(res.insertId);
                        } 
               )                                                                                   
               })
               
};

// connexion avec son mail et son mot de passe //

exports.login = (req, res, next) =>{
  db.query("SELECT password FROM `groupomania`.user WHERE email=?",req.body.email,(err, res, next) =>{
    if(!res){
      return console.error(err.message);
    }
    if(res> 0){
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if(valid){
          res.status(200).json({user: user._id,token: jwt.sign(
                                                         {userId: user_id},
                                                         process.env.JWT,
                                                         {expiresIn: '24h'}
                                          )
        })
        return console.log(token);
      }else{
        return console.error(err.message);
      }
    })
    }
       console.log(res[0].password)
   })   
   }                                                               