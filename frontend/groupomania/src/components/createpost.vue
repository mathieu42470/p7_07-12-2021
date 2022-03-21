<template>
      <div>
      <div class="post"> 
          <h1 class="titre">nouveau post</h1>           
          <form method="post" class="form1" name="create">
               <div>
                <label for="text">texte: </label>         
                <input class="texte" type="text" name="text"  v-model="post.text"/>
               </div>
                <div>
                    <label for="image">url image: </label>         
                    <input class="texte" type="url_image" name="image"  v-model="post.url_image"/>  
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
                     url_image: '' 
               }
       }
  },
  methods:{
       onsubmit(e) {
      e.preventDefault();
         fetch('http://localhost:3000/api/post',{
                method : 'POST',
                headers:{"Content-Type":"application/json"},
                body : JSON.stringify(this.post )
            }).then((data) => data.json()).then((result) =>{
                console.log( result)
         })            
         },
         mounted: () =>{
     
      console.log("je suis appelé")
      
}
       }
  }       

</script>
<style>
.post{
     width: 100%;
     height: 15rem;
}
.texte {
    width: 100%;
    margin: 5%;
}
</style>