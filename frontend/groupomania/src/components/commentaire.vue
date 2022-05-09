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
             <p class="nomprenom">{{item.firstname}}, {{item.lastname}}</p>
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
                      messages:null        
               }
},

 created(){
    fetch('http://localhost:3000/api/commentaire/'+this.$route.query.idpost, {
      method : 'GET',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer "+sessionStorage.getItem('Token')},
    })
    .then(res => res.json())
    .then(responseJson =>{
      this.messages = responseJson.message
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
  flex-direction: column;
  background-color: white;
  border: solid black;
  margin: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  width: 50%;
  justify-content: center;
}
.nomprenom{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.createcomment{
  display: flex;
  flex-direction: column;
  border: solid black;
  border-radius: 20px;
}
.texte{
  width: 90%;
}
.button{
  display: flex;
  text-align: center;
  margin: auto;
}
  </style>