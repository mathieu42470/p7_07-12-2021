const  json  = require('express');
const fs = require('fs');
const db = require('../MysqlParam');
const  post  = require('../route/post');
const con = require('../MysqlParam');
const { error } = require('console');

// création du message //
exports.createPost = (req, res, next) =>{   
  let playload = {
    text : req.body.txt,
    url_image : `${req.protocol}://${req.get('host')}/image/`+req.file.filename,
    id_user : req.body.userId
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
  db.query(`SELECT text, url_image, firstname, lastname, nblike, id_post FROM groupomania.post INNER JOIN groupomania.user ON groupomania.user.id_user = groupomania.post.id_user`, (err, result, fields) =>{
if(err){
      return res.status(400).json({message: err.message})
    }
    return res.status(200).json({message : result})  
   })    
};

// récupération d'un message en particulier //
exports.getOnepost = (req, res, next) =>{ 
                if(req.params.id_post){             
              db.query(`SELECT * FROM groupomania.post INNER JOIN groupomania.user ON groupomania.user.id_user = groupomania.post.id_user WHERE id_post= ?;`, req.params.id_post,(err, result) =>{
                 if(err){
                  return res.status(500).json({message : err.message})
                 } else{ 
                      
                  var row = '';
                  Object.keys(result).forEach((key) => {
                     row = result;                        
                  });                 
                  if(err){
                    return res.status(500).json({message : err.message})
                   }else{    
                     return res.status(200).json({message : result})
                    }
               }
              })
            }else{
              return res.status(500).json({message : "pas d'id"})
            }
   };

// modification d'un message //
exports.modifyPost = (req, res, next) =>{
  db.query(`UPDATE post SET text = ? WHERE id_post= ? AND id_user= ?`, [req.body.text,req.body.id_post,req.body.id_user],(err, result) =>{
    if(err){
      return res.status(400).json({message : err.message})
    }
    return res.status(200).json({message : "post modifié"})
  })
}

// suppression du message publié //
exports.deletePost = (req, res, next) => {
 db.query(`DELETE FROM post WHERE id_post =?;` ,req.params.id_post,(err, result)=>{
  if(err){
    return res.status(400).json({message : err.message})
  }
  return res.status(200).json({message : "post supprimé"})
 })
};

// like du message //
exports.likePost = (req, res, next) =>{
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
                return res.status(400).json({message : err.message})
              }else{              
                db.query(`UPDATE post SET nblike = nblike - 1 WHERE id_post= ?`,[req.body.id_post], (err, result) =>{
                  if(err){
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
               
        break
         // message liké //
        case 1: 
          db.query(`SELECT * FROM groupomania.like WHERE id_user = ? AND id_post= ?`,[req.body.id_user, req.body.id_post], (err, result) =>{
            if(err){
              return res.status(400).json({message : err.message})
            }
            if(result.length > 0){      
              return res.status(200).json({message : "Tu aimes déjà"})
            }else{
              db.query(`INSERT INTO groupomania.like SET ?`,{id_user : req.body.id_user, id_post : req.body.id_post}, (err, result) =>{
                  if(err){
                  return res.status(400).json({message : err.message})
                }else{
                    db.query(`UPDATE post SET nblike = nblike + 1 WHERE id_post= ?`,[req.body.id_post], (err, result) =>{
                    if(err){
                      return res.status(400).json({message : err.message})
                    }else{
                      return res.status(200).json({message : "Vous aimez le post"})
                    }                   
                  });
                }
              })
            }
          });
              break;
      };
    }