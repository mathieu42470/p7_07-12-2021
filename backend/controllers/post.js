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
               db.query(`SELECT text FROM groupomania.post WHERE id_post= ? ;`, (err, result) =>{
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
                 return res.status(500).json({message : result})
               }
              })
   };

// modification d'un message //
exports.modifyPost = (req, res, next) =>{
  db.query(`UPDATE text SET post WHERE id_utilisateur= ?`, (err, result) =>{
    if(err){
      return res.status(400).json({message : err.message})
    }
    return res.status(200).json({message : result})
  })
}

// suppression du message publié //
exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
  .then(Post =>{
    const filename = Message.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Post.deleteOne({_id: req.params.id})
      db.query("Select * From post",(error,resultat) =>{
        if(error){
          return res.status(400).json('error')
        }
        return res.status(200).json({message : resultat})
      })    
    })
  })
  .catch(error => res.status(500).json({ error }));
};

// like du message //
exports.likePost = (req, res, next) =>{
  const likes = req.body.like;
  const userId = req.body.userId;
  const postId = req.params.id;
  Post.findOne({_id: postId})
  .then(Post =>{
    switch(likes){
      // message non like
      case 0:
        if(Post.usersLiked.indexOf(userId)!= -1){
          Post.likes -= 1
        }
        result = "0"
        break;
        // message like //
        case 1:
          Post.likes += 1;
          result = "1";
    }
    Post.save();
  })
  .then(() =>{
    db.query(INSERT * INTO `groupomania`.post,
    ({likes})
    )
      if(error){
        return res.status(400).json('error')
      }
      return res.status(200).json({message : resultat}) 
})
}