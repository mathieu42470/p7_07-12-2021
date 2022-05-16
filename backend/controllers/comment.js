const fs = require('fs');
const { json } = require('express');
const db = require('../MysqlParam');

// création de la possibilité de commentaires //
exports.createComment = (req, res, next) =>{ 
           playload ={
             text: req.body.text,
             id_user: req.body.id_user,
             id_post: req.body.id_post
           }                
 db.query (`INSERT INTO commentaire SET ?`, playload, (err, rows) =>{
    if(err){
        return res.status(400).json({message : err.message})
      }
         return res.status(200).json({message : "commentaire enregistrer"})
 })  
};

// récupération de tous les commentaires //
exports.getAllComment = (req, res, next)=>{
 if(req.params.id){ 
   db.query(`SELECT firstname, lastname, id_post, text FROM groupomania.commentaire INNER JOIN groupomania.user ON groupomania.user.id_user = groupomania.commentaire.id_user WHERE id_post= ?;`, req.params.id, (err, result, fields) =>{
    if(err){
          return res.status(400).json({message: err.message})
        }else{
         
        return res.status(200).json({message : result})
         }
         
      })
     } else{
       return res.status(400).json({message: "pas de id post"})
     }
};

// récupération d'un commentaire en particulier //
exports.getOneComment = (req, res, next) =>{
  if(req.params.id){
  db.query(`SELECT text FROM groupomania.commentaire WHERE id_user= ?;`,req.params.id, (err, result) =>{
    if(err){
     return res.status(500).json({message : err.message})
   } else{
     var row ='';
     Object.keys(result).forEach((key) => {
        row = result[key];       
     });
    if(err){
     return res.status(500).json({message : err.message})
    }
    return res.status(200).json({message : row})
  }
 })
}else{
      return res.status(500).json({message : "pas d'id"})
    }
};

// modifier un commentaire //
exports.modifyComment = (req, res, next)=>{  
  db.query(`UPDATE commentaire SET text= ? WHERE id_commentaire= ? AND id_user= ?`, [req.body.text,req.body.id_commentaire,req.body.id_user], (err, result, fields) =>{
        if(err){
          return res.status(400).json({message : err.message})
        }
        return res.status(200).json({message : "commentaire modifié"})
      })    
};

 // suppression d'un commentaire //
 exports.deleteComment = (req, res, next) =>{
  db.query(`DELETE FROM commentaire WHERE id_commentaire =?;` ,req.params.id_commentaire,(err, result)=>{
    if(err){
      return res.status(400).json({message : err.message})
    }
    return res.status(200).json({message :"commentaire supprimé"})
  })
};
