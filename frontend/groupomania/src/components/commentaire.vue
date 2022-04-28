<template>  
  <div>             
       <div class="createcomment">
                      <h1>nouveau commentaire</h1>
                      <form method="post" class="formcom" name="create">
               <div>
                <label for="text">texte: </label>         
                <textarea class="texte"  name="text" placeholder="mon post"  v-model="comment.text"/>
                <input v-on:click="onsubmit" class="button" type="button" value='envoyer'/>
               </div>
                      </form>
       </div> 
       <h2> Commentaires postés</h2>
          <article v-for="(item) in messages" :key="item.id_comment" class="comment">
           <div>
          <p>{{item.text}}</p>
           </div>
          </article> 
  </div>   
</template>

<script>
export default {
     name : 'Comment',
     props : {
         msg: String    
},
data(){
               return{
                      comment: {
                          text:'',
                          id_user: sessionStorage.getItem('userid'),
                          id_post: sessionStorage.getItem('id_post'), 
                      },
                      messages: null        
               }
},

 created(){
    fetch('http://localhost:3000/api/commentaire/', {
      method : 'GET',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer "+sessionStorage.getItem('Token')},
    })
    .then(res => res.json())
    .then(responseJson =>{
      this.messages = responseJson
      console.log(responseJson)
    })
  },
  methods:{
     onsubmit(e){
                e.preventDefault();
                let comment =  new FormData();
                 comment.append("text", this.comment.text),
                 comment.append("id_user", this.comment.id_user),
                 comment.append("id_post", this.comment.id_post),    
                
                fetch('http://localhost:3000/api/commentaire', {
                               method: 'POST',
                               headers:{"Authorization":"Bearer "+ sessionStorage.getItem('Token')},
                               body: comment
                }).then((data) => data.json()).then((result) =>{ 
                               console.log(result)               
                                this.$router.go()
                })
     }
  }
}
  </script>
  <style>
  .comment{
  display: flex;
  background-color: white;
}
.createcomment{
  display: flex;
  flex-direction: column;
}
.button{
  display: flex;
  align-content: center;
}
  </style>