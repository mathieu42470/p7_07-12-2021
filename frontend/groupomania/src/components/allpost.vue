<template>
<div class="pages">
      <!-- tous les messages postés par les utilisateurs -->
      <h1> messages postés</h1>    
       <article v-for="(item) in messages" :key="item.id_post" class="articles"> 
             <a class="ids" @click.prevent="id($event, item.id_post)"> 
                  <div class="noms">
                     <p>{{item.lastname}} </p>
                      <p>{{item.firstname}}</p>
                   </div>
                   <div class="texts">
                      <p class="texte">{{item.text}} </p>
                      <img :src="item.url_image" class="images">
                   </div>
                   </a>  
                   <div class="likes">
                   <button class="bouttonjaime1" v-if="item.password == 1" @click.prevent="likePost($event, item.id_post,0)" value="envoyer" >j'aime</button>
                   <button class="bouttonjaime" v-else @click.prevent="likePost($event, item.id_post,1)" value="envoyer">j'aime</button>
                   <p>{{item.nblike}}</p> 
                   </div>
                   <div>
                   <div v-if="type_user > user" @click.prevent="suppression($event, item.id_post)" >                    
                   <button>suppression</button>
                   </div>
                         <p class="else" v-else><p/>
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
              type_user: sessionStorage.getItem("user_type"),
              id_user: sessionStorage.getItem("userid"),
              nblike:0,
              user:0
  }
  },
// récupération de tous les messages a la connexion //
  created()  {             
      fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Content-Type":"application/json", "Authorization" : "Bearer "+sessionStorage.getItem("Token")},
         })         
         .then(res => res.json())
               .then(resJson => {
                 this.messages = resJson.message;      
                  fetch('http://localhost:3000/api/post/like/'+sessionStorage.getItem("userid"),{
            method : 'GET',
            headers : {"Content-Type":"application/json", 
            "Authorization" : "Bearer "+sessionStorage.getItem("Token")},
      })         
      .then(res => res.json())
            .then(resJson => {
                  console.log(resJson)
            resJson.message.map((like)=>{                 
                  this.messages[this.messages.indexOf(this.messages.find(x => x.id_post == like.id_post))].password = 1
            })

            
            })         

              })
     
         },
 methods :{
      // envoie du like par une personne //
    likePost(e, id_post,aime){
        e.preventDefault();
        
       let like = {
         id_post: id_post,
         id_user: this.id_user,
         etat : aime,
        nblike: this.messages.find(x => x.id_post == id_post).nblike
     }
        fetch('http://localhost:3000/api/post/like', {
              method : 'POST',
              headers : {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
              body : JSON.stringify(like)
        }).then((data) => data.json()).then((result) =>{
                if(result.code == 1){
                       this.messages.find(x => x.id_post == id_post).nblike ++;
                       this.messages.find(x => x.id_post == id_post).password = 1;
                        //this.$router.go()
                }else{
                       this.messages.find(x => x.id_post == id_post).nblike --;
                       this.messages.find(x => x.id_post == id_post).password = 0;
                }

        })
         },
         // récupération de l'id d'un post pour l'envoie vers le post // 
         id(e, id_post){
               e.preventDefault();
               this.messages.find(x => x.id_post == id_post)
               sessionStorage.setItem("id_post", id_post) 
              this.$router.push('/onePost?idpost='+id_post)

         },
         // suppression d'un post par l'administrateur //
         suppression(e, id_post){
               e.preventDefault();
                this.messages.find(x => x.id_post == id_post)
               fetch('http://localhost:3000/api/post/'+id_post, {
                    method: 'DELETE',
                    headers: {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
                  }).then((data )=> data.json()).then((result)=>{
                     console.log(result)
               })
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: solid black;
      margin: 5%;
      background-color: coral;
      border-radius: 20px 20px 20px 20px;
}
.noms{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-bottom: dotted ;
      margin: 3%;
}
.texts{
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      margin: 3%;
      border-bottom: dotted ;
      
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
.else{
      height: 0%;
}
.bouttonjaime1{
      background-color: aquamarine;
      border-radius: 20px;
      border-color: black solid 2px;
      height: 35px;
      width: 56px;
}
.bouttonjaime{
      background-color: rgb(243, 71, 9);
      border-radius: 20px;
      height: 35px;
      width: 56px;
}
.texte{
      width:50%
}
</style>