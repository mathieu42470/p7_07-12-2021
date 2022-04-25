<template>
<div class="pages">
      <h1> messages postés</h1>    
       <article v-for="(item) in messages" :key="item.id_post" class="articles"> 
             <a class="ids" @click.prevent="id($event, item.id_post)"> 
                  <div class="noms">
                     <p>{{item.lastname}} </p>
                      <p>{{item.firstname}}</p>
                   </div>
                   <div class="texts">
                      <p>{{item.text}} </p>
                      <img :src="item.url_image" class="images">
                   </div>
                   </a>  
                   <div class="likes">
                   <button @click.prevent="likePost($event, item.id_post)" value="envoyer" >j'aime</button>
                   <p>{{item.nblike}}</p> 
                   </div>
                                 
      </article>  
</div>                     
</template>
<script>
export default {
     name : 'allPost',
     props : {
         msg: String
  },
  data() {
        return{
              messages:null,
              id_user: sessionStorage.getItem("userid"),
              nblike:0
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
    likePost(e, id_post){
        e.preventDefault();
        this.messages.find(x => x.id_post == id_post).nblike ++;
       let like = {
         id_post: id_post,
         id_user: this.id_user,
        nblike: this.messages.find(x => x.id_post == id_post).nblike
     }
        fetch('http://localhost:3000/api/post/like', {
              method : 'POST',
              headers : {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
              body : JSON.stringify(like)
        }).then((data) => data.json()).then((result) =>{
                 console.log(result);  
        })
         },


         id(e, id_post){
               e.preventDefault();
               this.messages.find(x => x.id_post == id_post)
               var idpost = id_post
              this.$router.push("/about/"+ idpost)
         }
 }  
  }          


</script>
<style>
.pages{
      width: 100%;
      height: 100%;
      border: grey;
}
.articles{
      width: 90%;
      height: 25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: solid black;
      margin: 5%;
      background-color: rgb(195, 187, 187);
      border-radius: 20px 20px 20px 20px;
}
.noms{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-bottom: solid ;
      margin: 3%;
}
.texts{
      display: flex;
      width: 100;
      flex-direction: row;
      justify-content: space-around;
      margin: 3%;
      
}
.images{
      height: 20%;
      width: 10%;
}
.likes{
      display: flex;
      width: 100%;
      height: 20px;
      margin: 3%;
      flex-direction: row;
      justify-content: space-around;
}
.ids{
      width: 100%;
      cursor: pointer;
}
</style>