<template>
      <div>
      <div class="post"> 
          <h1 class="titre">nouveau post</h1>           
          <form method="post" class="form1" name="create">
               <div>
                <label for="text">texte: </label>         
                <textarea class="texte"  name="text" placeholder="mon post"  v-model="post.text"/>
               </div>
                <div>
                    <label for="image">url image: </label>         
                    <input class="texte" type="file" name="image" v-on:change="previewFile" />  
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
                     file: '' 
               }
       }
  },
  methods:{
     previewFile(e){             
          this.post.file = e.target.files[0];
         const fileObjet = 
         JSON.parse(this.post.file);    
         delete fileObjet._id;
         const file = new file({
         ...fileObjet,
         image_url:
         `${this.protocol}://${this.get('host')}/images/${this.file.filename}`
         });
         file.save()                      
        .then((res) => res.status(201).json({message: "Objet enregistrer !"}))
        .catch(error => error.status(400).json({error}));   
         },

       onsubmit(e) {
      e.preventDefault();

     
         fetch('http://localhost:3000/api/post',{
                method : 'POST',
                headers:{"Content-Type":"application/json","Authorization" : "Bearer "+localStorage.getItem("Token")},
                body : JSON.stringify(this.post ),                
            }).then((data) => data.json()).then((result) =>{
                 //this.$router.go()
                 console.log(result);
         })            
         },
         
       }
  }       

</script>
<style>
.post{
     width: 100%;
     height: 20rem;
}
.texte {
    width: 100%;
    margin: 5%;
}
</style>