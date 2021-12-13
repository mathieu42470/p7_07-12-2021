const mongoose = require('mongoose');

// schéma d'un message envoyé par un utilisateur //

const messageSchema = mongoose.Schema({
          userId: {type: String, require: true},
});