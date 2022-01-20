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
                 return res.status(200).json({message : result})
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
    return res.status(200).json({message : result})
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

  //   Post.findOne({_id: req.params.id})
  // .then(Post =>{
  //   const filename = Message.imageUrl.split('/images/')[1];
  //   fs.unlink(`images/${filename}`, () =>{
  //     Post.deleteOne({_id: req.params.id})
  //     db.query("Select * From post",(error,resultat) =>{
  //       if(error){
  //         return res.status(400).json('error')
  //       }
  //       return res.status(200).json({message : resultat})
  //     })    
  //   })
  // })
  // .catch(error => res.status(500).json({ error }));
};

// like du message //
exports.likePost = (req, res, next) =>{
  const likes = req.body.like;
  const userId = req.body.userId;
  const postId = req.params.id;

  // Faire une rqt SELECT avec un WHERE sur l'id du post pour récupérer la liste des utilisateur qui aiment et qui n'aiment pas.
  Post.findOne({_id: postId})

  //ici construire un objet post avec le resultat de la rqt
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
    //ici faire une rqt UPDATE pour mettre à jour la table post / dislikes/ likes
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