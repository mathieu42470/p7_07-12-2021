const mongoose = require('mongoose');

// création du modele pour les commentaires sous les posts //
const commentSchema = mongoose.Schema({
               idComment: {type: String, require: true},
               text: { type: String, require: true},
               idUser: {type: String, require: true},     
})

module.exports = mongoose.model('comment', commentSchema);