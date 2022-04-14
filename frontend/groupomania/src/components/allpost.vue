<template>
<div class="page">
      <h1> messages postés</h1>
     
       <article v-for="(item) in messages" :key="item.id_post" class="article"  >
             
                   <div class="nom">
                     <p>{{item.lastname}} </p>
                      <p>{{item.firstname}}</p>
                   </div>
                   <div class="text">
                      <p>{{item.text}} </p>
                      <img :src="item.url_image" class="image">
                   </div> 
                   <div>
                   <button class="like" @click="count++" v-on:click="onsubmit" value="envoyer" >j'aime</button>
                   <p>{{count + like}}</p> 
                   </div>                
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
              messages:null,
              count : 0,
              like: ''
  }
  },
  created()  {              
      fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Authorization" : "Bearer "+sessionStorage.getItem("Token")},
         })          
         .then(res => res.json())
               .then(resJson => {
                 this.messages = resJson.message 
              })
         },
 methods :{
    onsubmit(e){
        e.preventDefault();
        console.log('je suis la', this.like);
        fetch('http://localhost:3000/api/post/like', {
              method : 'POST',
              headers : {"Content-Type":"application/json", "Authorization": "Bearer"+ sessionStorage.getItem("token")},
              body : JSON.stringify(this.like) 
        }).then((data) => data.json()).then((result) =>{
                 console.log(result);  
        })
         }
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
      margin: 5%;
      background-color: rgb(195, 187, 187);
      border-radius: 20px 20px 20px 20px;
}
.nom{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-bottom: solid ;
      margin: 3%;
}
.text{
      display: flex;
      width: 100;
      flex-direction: row;
      justify-content: space-around;
      margin: 3%;
      
}
.image{
      object-fit: cover;
      height: 50%;
      width: 50%;
}
.like 
{
      display: flex;
      width: 50px;
      height: 20px;
      margin: 3%;
}
</style>