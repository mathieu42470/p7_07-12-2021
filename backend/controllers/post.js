const  json  = require('express');
const Posts = require('../models/post');
const fs = require('fs');
const db = require('../MysqlParam');
const  post  = require('../route/post');

// création du message //
exports.createPost = (req, res, next) =>{
               const postObjet = JSON.parse(req.body.message);
               delete postObjet._id;
               const post = new post({
                               ...postObjet,
                              likes: 0,
                              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               });
               post.save()
               .then(() => {
                 db.query("Select * From post",(error,resultat) =>{
                                if(error){
                                  return res.status(400).json('error')
                                }
                                return res.status(200).json({message : resultat})
                              }) 
                            })
                .catch(error => res.status(400).json({ error }));
};

// récupération des messages pour la page d'accueil //
exports.getAllPost = (req, res, next) =>{
  post.find()
  db.query("Select * From post",(error,resultat) =>{
    if(error){
      return res.status(400).json('error')
    }
    return res.status(200).json({message : resultat})
  })    
};

// récupération d'un message en particulier //
exports.getOnepost = (req, res, next) =>{
               Message.findOne({_id : req.params.id})
               db.query("Select * From post",(error,resultat) =>{
                if(error){
                  return res.status(400).json('error')
                }
                return res.status(200).json({message : resultat})
              })    
};

// modification d'un message //
exports.modifyPost = (req, res, next) =>{
  const postObjet =req.file?{
    ...json.parse(req.body.Post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body };
  post.updateOne({_id: req.body.id}, { ...req.body, _id: req.params.id})
  db.query("Select * From post",(error,resultat) =>{
    if(error){
      return res.status(400).json('error')
    }
    return res.status(200).json({message : resultat})
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
    db.query("Select * From post",(error,resultat) =>{
      if(error){
        return res.status(400).json('error')
      }
      return res.status(200).json({message : resultat})
    })    
})
}