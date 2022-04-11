<template>
<div class="page">
      <h1> messages postés</h1>
     
       <article class="article" >
                   <div class="nom">
                      <p>{{message.firstname}}</p>
                      <p>{{message.lastname}} </p>
                   </div>
                   <div class="text">
                      <p>{{message.text}} </p>
                      <p>{{message.url_image}} </p>
                   </div> 
                   <button class="like">j'aime</button>                 
            </article>  
</div>                     
</template>
<script>
// import axios from 'axios';
export default {
     name : 'allPost',
     props : {
         msg: String
  },
  data() {
        return{
              message:{ 
                   text:null ,
                   url_image: null,
                   firstname: null,
                  lastname: null,
              }                   
  }
  },
  created()  {
      // this.objet = (await axios.get('http://localhost:3000/api/post/').objet )
           
      
      fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Authorization" : "Bearer "+localStorage.getItem("Token")},
         })          
         .then(function(response){
              return response.json()
               })
              .then(function(message){
                console.log(message); 
                return message
             })
         }
         
  }          


</script>
<style>
.page{
      width: 100%;
      height: 100%;
      border: grey;
}
.article{
      width: 90%;
      height: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: solid black;
}
.nom{
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
}
.text{
      display: flex;
      flex-direction: row;
}
.like 
{
      display: flex;
      width: 50px;
      height: 20px;
}
</style>