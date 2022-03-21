<template>
      <div>
            <article class="article" id="displayArticle">
                   <div class="nom">
                    <a class="firstname" {{user.firstname}}/>
                    <a class="lastname" {{user.lastname}}/>
                   </div>
                   <div class="text">
                         <a class="text" {{post.text}}/>
                         <a class="url" {{post.url_image}}/>
                   </div> 
                   <button class="like">j'aime</button>                 
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
      user: {
        firstname: '',
        lastname: ''
      },
      post:{
           text: '',
           url_image: '',
      }
    }                           
  },
  methods: {
      onsubmit(e) {
      e.preventDefault();
     console.log(this.user)
      fetch('http://localhost:3000/api/post/',{
        method : 'GET',
        headers:{"Content-Type":"application/json"},
        body : JSON.parse(this.displayArticle )
      }).then((data) => data.json()).then((result) =>{
        console.log( result)
      })    
     }
}       
}
</script>
<style>
.article{
      width: 100%;
      height: 20rem;
      display: flex;
}
.nom{
      width: 50%;
      display: flex;
      flex-direction: row;
}
.text{
      display: flex;
      flex-direction: row;
}
</style>