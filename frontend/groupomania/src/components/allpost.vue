<template>
<div class="page">
      <h1> messages postés</h1>
    
       <article v-for="(item) in messages" :key="item.id_post" class="article"> 
             <a class="id" v-on:click="id"> 
                  <div class="nom">
                     <p>{{item.lastname}} </p>
                      <p>{{item.firstname}}</p>
                   </div>
                   <div class="text">
                      <p>{{item.text}} </p>
                      <img :src="item.url_image" class="image">
                   </div>
                   </a>  
                   <div class="like">
                   <button @click.prevent="likePost($event, item.id_post)" value="envoyer" >j'aime</button>
                   <p>{{item.number_like }}</p> 
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
              numbers_like: '',
              id_user: sessionStorage.getItem("userid"),
              like:0
  }
  },
  created()  {             
      fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Content-Type":"application/json", "Authorization" : "Bearer "+sessionStorage.getItem("Token")},
         })         
         .then(res => res.json())
               .then(resJson => {
                 this.messages = resJson.message 
              })
         },
 methods :{
    likePost(e, id_Post){
        e.preventDefault();
        this.messages.find(x => x.id_post == id_Post).number_like ++;
      //   let idPost = this.messages.number_like ++
       let like = [
         id_Post,
         this.id_user,
         this.messages.find(x => x.id_post == id_Post).number_like
     ]
       //console.log('je suis la', like);
        fetch('http://localhost:3000/api/post/like', {
              method : 'POST',
              headers : {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
              body : JSON.stringify(like) 
        }).then((data) => data.json()).then((result) =>{
                 console.log(result);  
        })
         },


         id(e){
               e.preventDefault();
               this.$router.push("/about/id")
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
      width: 100%;
      height: 20px;
      margin: 3%;
      flex-direction: row;
      justify-content: space-around;
}
.id{
      width: 100%;
      cursor: pointer;
}
</style>