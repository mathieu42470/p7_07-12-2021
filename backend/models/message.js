const mongoose = require('mongoose');

// schéma d'un message envoyé par un utilisateur //

const messageSchema = mongoose.Schema({
               userId: {type: String, require: true},
               messageId: {type: String, require: true},
               text: {type: String, require: true},
               imageUrl: {type: String},
               likes: {type: Number, require: true},
               dislikes: {type:Number, require: true},
});

module.exports = mongoose.model('message', messageSchema);