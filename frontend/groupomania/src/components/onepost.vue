<template>
<div class="page">
     <h1 class="titre"> message posté </h1>
     <article class="article">
         <div class="name">
            <p>{{message.firstname}}</p>
            <p>{{message.lastname}}</p>
         </div>
         <div class="text">
           <p>{{message.text}}</p>
           <img class="image" :src="message.url_image">
            </div> 
           <div class="like">
           <button @click.prevent="likPost($event, message.id_post)" value="envoyer" >j'aime</button> 
             <p>{{message.nblike}}</p>
           </div>                  
        </article>
        <div >
             <div v-if="message.id_user == id_user" class="modifier">
               <h1>modifier son post</h1>
               <div class="textmo">
                 <label for="text">texte: </label>         
                 <textarea name="text" placeholder="mon post" v-model="post.texte"/>
               </div>
               <div class="textmo">
                   <label for="image">url image: </label>         
                   <input  type="file" name="image" v-on:change="previewFile" /> 
               </div>
             <input v-on:click="onsubmits" class="but" type="button" value='modifier le post'/>
             </div>
             <p v-else></p>
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
      id_user: sessionStorage.getItem('userid'),
      id_post: sessionStorage.getItem('id_post'),
      nblike: 0,
      post:{
          texte:'',
          file:''
      }
    }

  },
  created() {       
    fetch('http://localhost:3000/api/post/'+this.$route.query.idpost, {
      method : 'GET',
       headers : {"Content-Type": "application/json", "Authorization": "Bearer "+sessionStorage.getItem('Token')},
    })
    .then(response => response.json())
    .then(resJson =>{      
      this.message = resJson.message[0];   
    })    
  },
  methods : {
     likPost(e, id_post){
        e.preventDefault();     
        this.message.nblike ++;
       let like = {
         id_post: id_post,
         id_user: this.id_user,
         nblike: this.message.nblike
     }
        fetch('http://localhost:3000/api/post/like', {
              method : 'POST',
              headers : {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
              body : JSON.stringify(like)
        }).then((data) => data.json()).then((result) =>{
                 console.log(result);  
        })
         },
          previewFile(e){             
          this.post.file = e.target.files[0];  
         },
         onsubmits(e){
           e.preventDefault();
           let forms = new FormData();
           forms.append("image", this.post.file)
           forms.append('text', this.post.texte)
           forms.append('id_user', this.id_user)
           forms.append('id_post', this.id_post)
           fetch('http://localhost:3000/api/post',{
             method: 'PUT',
             headers: {"Authorization": "Bearer "+ sessionStorage.getItem("Token")},
             body: forms
           }).then((data) => data.json()).then((result) =>{
                  //  this.$router.go()
                  console.log(result)
           })
         },
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
  height: 80%;
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
.modifier{
  height: 25%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column ;
  border: solid black;
  justify-content: center;
}
.textmo{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.but{
  width: 10%;
  text-align: center;
  display: flex;
  text-align: center;
  margin: auto;
}
</style>

