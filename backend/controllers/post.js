const  json  = require('express');
const Posts = require('../models/post');
const fs = require('fs');
const db = require('../MysqlParam');
const  post  = require('../route/post');
const con = require('../MysqlParam');

// const text = req.body.text;
// const url_image = req.body.url_image;
// const date = req.body.date;
// const id_post = req.body._id;

// création du message //
exports.createPost = (req, res, next) =>{
 db.query (INSERT * INTO `post` ( `text`, `url_image`,`date`)
  ({text: text }, {url_image: url_image }, {date: date})
 )
     post.save()
         .then((post) => {
            if(error){
                return res.status(400).json('error')
              }
                 return res.status(200).JSON({message : resultat})
                }) 
         .catch(error => res.status(400).json({ error }))             
};

// récupération des messages pour la page d'accueil //
exports.getAllPost = (req, res, next) =>{
  db.query(SELECT 
    `post`.text,
    `post`.url_image,
    `post`.date,
FROM `groupomania`.post)
    if(error){
      return res.status(400).json('error')
    }
    return res.status(200).json({message : resultat})  
};

// récupération d'un message en particulier //
exports.getOnepost = (req, res, next) =>{
               db.query(SELECT `post`.id_post,
               `post`.text,
               `post`.url_image,
               `post`.date,
               FROM `groupomania`.post)
                if(error){
                  return res.status(400).json('error')
                }
                return res.status(200).json({message : resultat})   
};

// modification d'un message //
exports.modifyPost = (req, res, next) =>{
  db.query(UPDATE `groupomania`.post ({text: text}, {url_image: url_image })
  );
    if(error){
      return res.status(400).json('error')
    }
    return res.status(200).json({message : resultat})
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