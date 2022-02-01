const  json  = require('express');
const Posts = require('../models/post');
const fs = require('fs');
const db = require('../MysqlParam');
const  post  = require('../route/post');
const con = require('../MysqlParam');
const { error } = require('console');

// création du message //
exports.createPost = (req, res, next) =>{
  let playload = {
    text : req.body.text
  }
 db.query (`INSERT INTO post SET ?`, playload, (err,rows)=>{
    if(err){
        return res.status(400).json({message : err.message})
      }
         return res.status(200).json({message : "message enregistrer"})
 })          
};

// récupération des messages pour la page d'accueil //
exports.getAllPost = (req, res, next) =>{
  db.query(`SELECT * FROM post`, (err, result, fields) =>{
if(err){
      return res.status(400).json({message: err.message})
    }
    return res.status(200).json({message : result})  
   })    
};

// récupération d'un message en particulier //
exports.getOnepost = (req, res, next) =>{
                if(req.params.id){
               db.query(`SELECT text FROM groupomania.post WHERE id_post= ? ;`, req.params.id,(err, result) =>{
                 if(err){
                  return res.status(500).json({message : err.message})
                } else{
                  var row ='';
                  Object.keys(result).forEach(function(key) {
                     row = result[key];       
                  });
                 if(err){
                  return res.status(500).json({message : err.message})
                 }
                 return res.status(200).json({message : "post modifié"})
               }
              })
            }else{
              return res.status(500).json({message : "pas d'id"})
            }
   };

// modification d'un message //
exports.modifyPost = (req, res, next) =>{
  //const tab : [] = (req.body)
  db.query(`UPDATE post SET text = ? WHERE id_post= ? AND id_utilisateur= ?`, [req.body.text,req.body.id_post,req.body.id_utilisateur],(err, result) =>{
    if(err){
      return res.status(400).json({message : err.message})
    }
    return res.status(200).json({message : "post supprimé"})
  })
}

// suppression du message publié //
exports.deletePost = (req, res, next) => {

  console.log(req.params.id)
 db.query(`DELETE FROM post WHERE id_post =?;` ,req.params.id_post,(err, result)=>{
  if(err){
    return res.status(400).json({message : err.message})
  }
  return res.status(200).json({message : result})
 })
};

// like du message //
exports.likePost = (req, res, next) =>{

  // Quand on aime ou pas un post 
    
    // Faire une rqt SELECT avec un WHERE sur l'id du post pour récupérer la liste des utilisateur qui aiment et qui n'aiment pas.
  // db.query(`SELECT * FROM groupomania.like WHERE id_user = ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{
  //   if(err){
  //     return res.status(400).json({message : err.message})
  //   }else{
    //ici construire un objet post avec le resultat de la rqt
    console.log(req.body)
  
    switch(req.body.like){
      // message non like
      case 0:
        db.query(`SELECT * FROM groupomania.like WHERE id_user = ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{
          if(err){
            
            return res.status(400).json({message : err.message})
          }
          if(result){
            db.query(`DELETE FROM groupomania.like WHERE id_user= ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{

              if(err){
                console.log("je passe ici")
                return res.status(400).json({message : err.message})
              }else{
                db.query(`UPDATE Post SET likes= ? WHERE id_post= ?`,[req.body.nblikes ,req.body.id_post], (err, result) =>{
                  
                  if(err){
                    console.log("je passe ici 2")
                    return res.status(400).json({message : err.message})
                  }else{
                    return res.status(200).json({message : "Vous n'aimez plus le post"})
                  }
                 

                });
              }

            })
          }else{
            return res.status(200).json({message : "Tu aimes déjà"})
          }

        });
        //avant verifier si ton user est bien dans la table like SELECT
          // ici faire le delete dans la table like DELETE
          //decrementer la valeur like dans la table post UPDATE
        
        break;
       
        case 1:
          db.query(`SELECT * FROM groupomania.like WHERE id_user = ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{
            if(err){
              
              return res.status(400).json({message : err.message})
            }
            if(result.lenght<0){
              db.query(`INSERT FROM groupomania.like WHERE id_user= ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{
  
                if(err){
                  return res.status(400).json({message : err.message})
                }else{
                  db.query(`UPDATE Post SET likes= ? WHERE id_post= ?`,[req.body.nblikes ,req.body.id_post], (err, result) =>{
                    
                    if(err){
                      return res.status(400).json({message : err.message})
                    }else{
                      return res.status(200).json({message : "Vous aimez le post"})
                    }
                   
  
                  });
                }
  
              })
            }else{
              return res.status(200).json({message : "Tu aimes déjà"})
            }
  
          });
        //avant verifier si ton user est bien dans la table like SELECT
          // si ton utilisaateur n'est dans la table like ici faire l'ajout dans la table like INSERT
          // incrementer la valeur like dans la table post UPDATE
        break;
      }
   }