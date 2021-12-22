const express = require('express');
const bodyParser = require('body-parser');
const mySQL = require("mysql");
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();


const messageRoutes = require('./route/message');
const commentRoutes = require('./route/comment');
const userRoutes = require('./route/user');
const { db } = require('./models/user');



var con = mySQL.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

con.connect(function(err){
  if(err) throw err;
});

con.query("Select * From type_user",(error,res) =>{
  console.log(res)
})

module.exports = con;

const app = express();
app.use(bodyParser.json());
const corsOption ={
  origin: '*',
};
app.use(cors(corsOption));

app.use('/api/post', messageRoutes);
app.use('api/post', commentRoutes);
app.use('api/auth', userRoutes);

module.exports = app;
