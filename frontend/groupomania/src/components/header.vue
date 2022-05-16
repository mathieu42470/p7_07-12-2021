<template>
   <header>
     <!-- header de toutes les pages du site -->
     <img src="../../images/icon-left-font-monochrome-white.png" >
     <!-- bouton qui permet la deconnexion ou la suppressionde son compte et le retour à la premiere page -->
     <a class="accueil" v-on:click="accueil">         
       <p  v-if=" this.$route.name ==='home' "></p>
       <div v-else class="bouton">
       <button >deconnexion</button> 
       <button @click.prevent="suppressionUser($event, id_user)">supprimer son compte</button> 
       </div>         
     </a>                    
   </header>
</template>

<script>
export default {
  name: 'header',
  props: {
    isconnected : Boolean,
    msg: String
  },
  data(){
     return{
       id_user: sessionStorage.getItem('userid')
     }
  },
  mounted (){
    console.log(this.$route.name)
  },
  
  methods:{
    // effacement des données dans la session storage et retour à la page d'accueil //
    accueil(e){
               e.preventDefault();
                sessionStorage.clear();
                this.isconnected = false;
                this.$router.push('/');               
         },
        suppressionUser(e,id_user){
          e.preventDefault();
          fetch('http://localhost:3000/api/user/'+id_user, {
                    method: 'DELETE',
                    headers: {"Content-Type":"application/json", "Authorization": "Bearer "+ sessionStorage.getItem("Token")},
                  }).then((data )=> data.json()).then((result)=>{
                     console.log(result)
               })
        }

  }
}


</script>

<style >
 header{
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  background-color: rgb(253, 45, 1);
}
img{
   height: 15rem;
   width: 20%;
   display: flex;
   margin: 0%;
}
.bouton{
  display: flex;
  height: 20px;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
}
.accueil{
  display: flex;
  width: 50%;
}
@media (min-width: 100px) and (max-width: 600px){
  img{
    height: 10rem;
    width: 30%;
    display: flex;
  }
  .accueil{
    display: flex;
  }
  .bouton{
    display: flex;
    flex-direction: column;
  }
}
</style>
