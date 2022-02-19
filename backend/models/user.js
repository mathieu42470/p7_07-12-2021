// const mongoose = require('mongoose');
// const uniquevalidator = require('mongoose-unique-validator');
// const { stringify } = require('querystring');

// // schema pour une inscription d'un utilisateur //

// const userSchema = mongoose.Schema({
//                firstName: { type: String, required: true},
//                lastName: {type: String, required: true},
//                email: { type: String, required: true, unique: true},
//                password: { type: String, required: true},
// });

// userSchema.plugin(uniquevalidator);

// module.exports = mongoose.model('user', userSchema);