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
                let playload ={
                  email : req.body.email,
                  password : hash,
                  firstname : req.body.firstname,
                  lastname : req.body.lastname
                }               
                        db.query (`INSERT INTO user SET ?`,playload, (err,rows)=>{
                          if(err){
                            return res.status(500).json({message : err.message});
                          }
                          return res.status(200).json({message : "utilisateur ajouté"}); 
                        } 

               );           
                                                                                    
               })
               
};

// connexion avec son mail et son mot de passe //

exports.login = (req, res, next) =>{

  db.query(`SELECT password, id_user FROM groupomania.user WHERE email= ? ;`,req.body.email,(err, result, fields) =>{
    if(err){
      return res.status(500).json({message : "Nous n'avons pas trouvé d'utilisateur"});
    }else{
      var row ='';
      Object.keys(result).forEach(function(key) {
         row = result[key];      
      });  
    }
    if(result.length> 0){
      bcrypt.compare(req.body.password,row.password).then((valid) => {
        if(valid){
          res.status(200).json({user: row.id_user,token: jwt.sign(
                                                         {userId: row.id_user},
                                                         process.env.JWT,
                                                         {expiresIn: '24h'}
                                          )
        })
       
      }else{
        res.status(500).json({message : "mot de passe incorrect"});
      }
    })
    }
      
   })   
   }                                                               