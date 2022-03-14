<template>
      <div>
            <article class="post" id="displayArticle">
                   <div class="nom">
                    <form>
                       <input class="firstname" v-model="user.firstname" />
                       <input class="lastname" v-model="user.lastname"/>
                    </form>
                   </div>
                   <div class="text">
                        <form> 
                              <input class="text" v-model="post.text"/>
                              <input class="url" v-model="post.url_image"/>
                        </form>   
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
    return {
      user: {
         firstname: '',
         lastname: '',
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
        method : 'POST',
        headers:{"Content-Type":"application/json"},
        body : JSON.parse(this.displayArticle )
      }).then((data) => data.json()).then((result) =>{
        console.log( result)
      })    
     },
}       
}
</script>
<style>

</style>