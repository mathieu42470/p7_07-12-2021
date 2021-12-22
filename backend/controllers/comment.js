const Comment = require('../models/comment');
const fs = require('fs');
const { json } = require('express');


// création de la possibilité de commentaires //
exports.createComment = (req, res, next) =>{
               Message.findOne({_id: req.params.id})
               const commentObjet = json.parse(req.body.comment);
               delete commentObjet._id;
               const comment = new Comment({
                              ...commentObjet,
                              likes: 0,
                              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               });
               Comment.save()
               .then(() => {               
                              res.status(200).json({message:'commentaire ajouté !'});
                             })
                          .catch(error => res.status(400).json({ error }));
};

// récupération de tous les commentaires //
exports.getAllComment = (req, res, next)=>{
               Comment.find()
               .then(Comment => res.status(200).json(Comment))
               .catch(error => res.status(400).json({ error }));
};

// récupération d'un commentaire en particulier //
exports.getOneComment = (req, res, next) =>{
               Comment.findOne({_id: req.params.id})
               .then(Comment => res.status(200).json(Comment))
               .catch(error => res.status(400).json({ error }));
};

// modifier un commentaire //
exports.modifyComment = (req, res, next)=>{
      const commentObjet = req.file?{
                     ...json.parse(req.body.Comment),
                     imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`    
      } : { ...req.body };
      Comment.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
      .then(() => res.status(200).json({message:'commentaire modifié'}))
      .catch(error => res.status(400).json({ error }));
};

 // suppression d'un commentaire //
 exports.deleteComment = (req, res, next) =>{
               Comment.findOne({ _id: req.params.id})
                .then(Comment => {      
                  const filename = Comment.imageUrl.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                   Comment.deleteOne({ _id: req.params.id })
                      .then(() => res.status(200).json({message:'commentaire supprimé'}))
                      .catch(error => res.status(400).json({ error }));
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
  .then(() =>{
    res.status(200).json({message:result})});
};