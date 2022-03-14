const mySQL = require("mysql");


require('dotenv').config();


var con = mySQL.createConnection({
               host: process.env.host,
               user: process.env.user,
               password: process.env.password,
               database: process.env.database,
               port: 3307
             });
             
             con.connect(function(err){
               if(err) {
                console.log("pas de connexion");
                throw err;
               };
             });
             
                          
             module.exports = con;