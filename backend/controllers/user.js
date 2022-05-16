const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const db = require('../MysqlParam')

// inscription des utilisateurs dans la base de donnée //

exports.signup = async(req, res, next) => {
  try{
               bcrypt.hash(req.body.password, 10).then(hash => { 
                let data ={
                  email : req.body.email,
                  password : hash,
                  firstname : req.body.firstname,
                  lastname : req.body.lastname,
                }               
                        db.query (`INSERT INTO user SET ? `,data, (err,rows)=>{
                          if(err){
                            return res.status(500).json({message : err.message});
                          }
                          return res.status(200).json({message : "utilisateur ajouté"}); 
                        } 
               );                                                                          
               })
              }catch(err) {
                console.error('handle the err: ', err)
               }
               
};

// connexion avec son mail et son mot de passe //

exports.login = (req, res, next) =>{
  db.query(`SELECT password, id_user, user_type FROM groupomania.user WHERE email= ?;`,req.body.email,(err, result, fields) =>{
    if(err){
      return res.status(500).json({message : "Nous n'avons pas trouvé d'utilisateur "+err});
    }else{
      var row ='';
      Object.keys(result).forEach(function(key) {
         row = result[key];      
      });  
    }
    if(result.length> 0){
      bcrypt.compare(req.body.password,row.password).then((valid) => {
        if(valid){        
          res.status(200).json({user: row,token: jwt.sign(
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
  
   // suppression d'un profil par l'utilisateur //
   exports.deleteUser = (req, res, next) => {
    console.log(req.params.id);
   db.query(`DELETE FROM user WHERE id_user =?;` ,req.params.id,(err, result)=>{
    if(err){
      return res.status(400).json({message : err.message})
    }
    return res.status(200).json({message : "utilisateur supprimé"})
   })
  };