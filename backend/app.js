const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const helmet = require('helmet');
const cors = require('cors');


const postRoutes = require('./route/post');
const commentRoutes = require('./route/comment');
const userRoutes = require('./route/user');


const app = express();
app.use(bodyParser.json());
const corsOption ={
  origin: '*',
};
app.use(cors(corsOption));
app.use('/image',express.static(path.join(__dirname,'image')));

app.use('/api/post', postRoutes);
app.use('/api/commentaire', commentRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
