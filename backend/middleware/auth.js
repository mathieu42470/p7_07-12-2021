const jwt = require('jsonwebtoken');

// création du middleware d'authentification //
module.exports = (req, res, next) => {
               try{
                              const token = req.headers.authorization.split(' ')[1];
                              const decodedToken = jwt.verify(token, process.env.JWT);
                              const userId = decodedToken.userId;
                              if(req.body.userId && req.body.userId !== userId){
                                             throw 'user non valable!';
                              }else{
                                             next();
                              }
               }
               catch (error){
                              req.status(401).json({error: error | 'requête non authentifié !'})
               }
}