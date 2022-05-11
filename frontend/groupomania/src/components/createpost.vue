<template>
      <div>
      <div class="post"> 
          <h1 class="titre">nouveau post</h1>  
                   <!-- formulaire pour écrire un nouveau post  -->
          <form method="post" class="form2" name="create">
               <div class="formtexte">
                <label  for="text">texte: </label>         
                <textarea  name="text" placeholder="mon post"  v-model="post.text"/>
               </div>
                <div class="formtexte">
                    <label for="image">url image: </label>         
                    <input type="file" name="image" v-on:change="previewFile" />  
                </div>
                <div>           
                    <input v-on:click="onsubmit" class="button" type="button" value='envoyer'/>
                </div>
          </form>             
          </div>
     </div>         
</template>
<script>
export default {
       name: 'create',
       props: {
  msg: String     
  }, 
  data() {
       return{
               post: {
                     text:'',
                     file: '',
                     id_user: sessionStorage.getItem('userid')
               }
       }
  },
  methods:{
     // changement des fichiers pour pouvoir être envoyé //
     previewFile(e){             
          this.post.file = e.target.files[0];  
         },
          // envoie du formulaire à la base de données //
       onsubmit(e) {
      e.preventDefault();

          let form = new FormData();
          form.append("image",this.post.file)
          form.append("txt", this.post.text)
          form.append("userId", this.post.id_user)
         fetch('http://localhost:3000/api/post',{
                method : 'POST',
                headers:{                   
                     "Authorization" : "Bearer "+sessionStorage.getItem("Token")},
                body : form                
            }).then((data) => data.json()).then((result) =>{
               // rechargement de la page avec le nouveau post crée //
                  this.$router.go()
                  console.log(result)
         })            
         },
         
       }
  }       

</script>
<style>
.post{
     width: 100%;
     height: 17rem;
}
.form2{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2%;
      border: solid black;
      border-radius: 20px;
      width: 90%;
}
.formtexte{
     display: flex;
     flex-direction: row;
     align-items: center;
     width: 50%;
     margin: 2%;
}
</style>