const Comment = require('../models/comment');
const fs = require('fs');
const { json } = require('express');
const db = require('../MysqlParam');

// const text = req.body.text;
// const url_image = req.body.url_image;
// const date = req.body.date;
// const id_commentaire = req.body._id;

// création de la possibilité de commentaires //
exports.createComment = (req, res, next) =>{                           
  let playload = {
    text : req.body.text
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
  db.query(`SELECT * FROM commentaire`, (err, result, fields) =>{
    if(error){
          return res.status(400).json({message: err.message})
        }
        return res.status(200).json({message : result})  
      })  
};

// récupération d'un commentaire en particulier //
exports.getOneComment = (req, res, next) =>{
  db.query(`SELECT text where id_user= ?;`, (err, result, fields) =>{
    if(error){
     return res.status(500).json({message : err.message})
   } else{
     var row ='';
     Object.keys(result).forEach((key) => {
        row = result[key];       
     });
    if(err){
     return res.status(500).json({message : err.message})
    }
    return res.status(500).json({message : result})
  }
 })
};

// modifier un commentaire //
exports.modifyComment = (req, res, next)=>{
  db.query(`UPDATE text SET commentaire WHERE id_user= ? `, (err, result, fields) =>{
        if(err){
          return res.status(400).json({message : err.message})
        }
        return res.status(200).json({message : result})
      })
};

 // suppression d'un commentaire //
 exports.deleteComment = (req, res, next) =>{
               Comment.findOne({ _id: req.params.id})
                .then(Comment => {      
                  const filename = Comment.imageUrl.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                   Comment.deleteOne({ _id: req.params.id })
                   db.query("Select * From commentaire",(error,resultat) =>{
                    if(error){
                      return res.status(400).json('error')
                    }
                    return res.status(200).json({message : resultat})
                  }) 
                  })
                })
                .catch(error => res.status(500).json({ error }));
};

// like du commentaire //
exports.likeComment = (req, res, next) =>{
  const likes = req.body.like;
  const userId = req.body.userId;
  const commentId = req.params.id;
  Comment.findOne({_id: commentId})
  .then(Comment =>{
    switch(likes){
      // commentaire pas like //
      case 0:
        if(Comment.usersLiked.indexOf(userId)!= -1){
          Comment.likes -= 1
        }
        result = "0"
        break;
        // commentaire like //
        case 1:
          Comment.likes += 1;
          result = "1";
    }
    Comment.save();
  })
  db.query(INSERT * INTO `groupomania`.commentaire,
  ({likes})
  )
    if(error){
      return res.status(400).json('error')
    }
    return res.status(200).json({message : resultat}) 
};