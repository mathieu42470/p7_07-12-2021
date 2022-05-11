<template>  
  <div>    
             <!-- formulaire pour la création de commentaire  -->
       <div class="createcomment">
                      <h1>nouveau commentaire</h1>
                      <form method="post" class="formcom" name="create">
               <div class="commentext">
                <label for="text">texte: </label>         
                <textarea class="texte"  name="text" placeholder="mon post"  v-model="comment.text"/>
                </div>
                <input v-on:click="onsubmit" class="buton" type="button" value='envoyer'/>
               
                      </form>
       </div> 
       <!-- formulaire pour la mise en page des commentaires -->
       <h2> Commentaires postés</h2>
          <article v-for="(item) in messages" :key="item.id_comment" class="comment">
           <div>
             <div class="nomprenom">
               <p>{{item.lastname}}</p>
               <p> {{item.firstname}}</p>
             </div>
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
  // récupération des commentaires //
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
    // envoie du formulaire d'un nouveau commentaire // 
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
  border-bottom: dotted;
}
.createcomment{
  display: flex;
  flex-direction: column;
  border: solid black;
  border-radius: 20px;
}
.commentext{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.texte{
  width: 40%;
}
.buton{
  margin: 2%;
}
  </style>