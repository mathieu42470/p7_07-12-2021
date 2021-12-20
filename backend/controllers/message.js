const Message = require('../models/message');


// création du message //
exports.createMessage = (req, res, next) =>{
               const messageObjet = JSON.parse(req.body.message);
               delete messageObjet._id;
               const messages = new message({
                               ...messageObjet,
                              likes:0,
                              dislikes:0,
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