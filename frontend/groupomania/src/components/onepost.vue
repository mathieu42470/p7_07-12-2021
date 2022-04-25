<template>
<div class="page">
     <h1 class="titre"> message posté </h1>
     <article  class="article">
         <div class="name">
            <!-- <p>{{message.firstname}}</p>
            <p>{{message.lastname}}</p> -->
         </div>
         <div class="text">
           <!-- <p>{{message.text}}</p>
           <img class="image" :src="message.url_image"> -->
            </div> 
           <div class="like">
           <!-- <button @click.prevent="likePost($event, item.id_post)" value="envoyer" >j'aime</button> 
             <p>{{message.nblike}}</p> -->
           </div>
        
        </article>
        <div class="comment">
          <!-- <p>{{message.comment}}</p> -->
         </div>
    
</div>  
</template>
<script>
export default {
     name : 'onePost',
     props : {
         msg: String
  },
  data(){
    return{
      message: null,
    }
  },
  created() {  
    fetch('http://localhost:3000/api/post/:id_post', {
      method : 'GET',
       headers : {"Content-Type": "application/json", "Authorization": "Bearer "+sessionStorage.getItem('Token')},
    })
    .then(response => response.json())
    .then(resJson =>{
      this.messages = resJson.message
      console.log(this.messages);
    })    
  }
}
</script>

<style sass>
.page{
  width: 100%;
  height: 50rem;
}
.article{
  width: 90%;
  height: 100%;
  background-color: coral;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center ;
  border: solid, black;
  border-radius: 20px 20px 20px 20px;
  margin: 3%;
}
.name, .text, .like{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 3%;
  border-bottom: solid ;
}
.image{
  height: 20%;
   width: 10%;
   object-fit: cover;
}
.comment{
  display: flex;
}
</style>

