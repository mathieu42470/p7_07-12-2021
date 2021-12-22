const { json } = require('express');
const Message = require('../models/message');
const fs = require('fs');

// création du message //
exports.createMessage = (req, res, next) =>{
               const messageObjet = JSON.parse(req.body.message);
               delete messageObjet._id;
               const messages = new message({
                               ...messageObjet,
                              likes:0,
                              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               });
               messages.save()
                .then(() => {
                              res.status(200).json({message:' message crée !'}); 
                            })
                .catch(error => res.status(400).json({ error }));
};

// récupération des messages pour la page d'accueil //
exports.getAllMessage = (req, res, next) =>{
               Message.find()
               .then(Sauces => res.status(200).json(Message))
               .catch(error => res.status(400).json({ error }));
};

// récupération d'un message en particulier //
exports.getOneMessage = (req, res, next) =>{
               Message.findOne({_id : req.params.id})
               .then(Sauces => res.status(200).json(Message))
               .catch(error => res.status(400).json({ error }));
};

// modification d'un message //
exports.modifyMessage = (req, res, next) =>{
  const messageObjet =req.file?{
    ...json.parse(req.body.Message),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body };
  Message.updateOne({_id: req.body.id}, { ...req.body, _id: req.params.id})
  .then(() => res.status(200).json({message:'message modifié'}))
  .catch(error => res.status(400).json({ error }));
}

// suppression du message publié //
exports.deleteMessage = (req, res, next) => {
  Message.findOne({_id: req.params.id})
  .then(Message =>{
    const filename = Message.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Message.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message:'message supprimé'}))
           .catch(error => res.status(400).json({ error }));
    })
  })
  .catch(error => res.status(500).json({ error }));
};

// like du message //
exports.likeMessage = (req, res, next) =>{
  const likes = req.body.like;
  const userId = req.body.userId;
  const messageId = req.params.id;
  Message.findOne({_id: messageId})
  .then(Message =>{
    switch(likes){
      // message non like
      case 0:
        if(Message.usersLiked.indexOf(userId)!= -1){
          Message.likes -= 1
        }
        result = "0"
        break;
        // message like //
        case 1:
          Message.likes += 1;
          result = "1";
    }
    Message.save();
  })
  .then(() =>{
    res.status(200).json({message:result})});
};