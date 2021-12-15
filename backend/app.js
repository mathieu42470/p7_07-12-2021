const express = require('express');
const bodyParser = require('body-parser');
const mySQL = require("mysql");
const helmet = require('helmet');
const cors = require('cors');


const messageRoutes = require('./route/message');
const commentRoutes = require('./route/comment');
const userRoutes = require('./route/user');

mySQL.createConnection(process.env.db)
.then(()=> console.log('connexion à la base de donnée réussit !'))
.catch(()=> console.log('connexion à la base de donée à échouée!'));


const app = express();
app.use(bodyParser.json());
const corsOption ={
  origin: '*',
};
app.use(cors(corsOption));

app.use('/api/post', messageRoutes);
app.use('api/post', commentRoutes);
app.use('api/auth',cuserRoutes);

module.exports = app;
