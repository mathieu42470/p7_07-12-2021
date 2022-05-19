<template>
    <div class="corps">
      <h1>Inscription</h1>
      <!-- formulaire pour s'inscrire sur le site internet -->
      <form class="form1" name="inscription" method="post" enctype="application/x-www-form-urlencoded" >
          <div class="form">
             <label for="firstName">Prénom : </label>
             <input id="firstName" type="text" name="firstName" v-model="user.firstname"/>
          </div>
          <div class="form">
             <label for="lastName">Nom : </label>
             <input id="lastName" type="text" name="lastName"  v-model="user.lastname"/>
           </div> 
          <div class="form">
             <label for="email">Adresse e-mail : </label>
             <input id="email" type="email" name="email"  v-model="user.email"/>
           
          </div>
          <div class="form">
            <label for="password">mot de passe : </label>
            <input id="password" type="password" name="password" v-model="user.password" />
           </div>
          <div>           
            <input v-on:click="onsubmit" class="button" type="button" value='envoyer'/>
          </div>
          </form>
    </div>
</template>
<script>
 
export default {
  name: 'Formulaire',
  props: {
    msg: String
  },
  data() {
    return {
      user: {
         password : '',
         email : '',
         firstname: '',
         lastname: '',
      }
          }                                 
  },
  methods: {
    // envoie du formulaire dans la base de données //
      onsubmit(e) {
      e.preventDefault();
      fetch('http://localhost:3000/api/user/signup',{
        method : 'POST',
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify(this.user )
      }).then((data) => data.json()).then((result) =>{
        console.log( result)
        this.$router.go();
      })    
     },
}
}
</script>
<style >
.corps{
  height: 25rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
 label{
   display: flex;
   width: 40%;
} 
.form{
  display: flex;
  align-items: center;
  margin: 2%;
  width: 80%;
  justify-content: space-around;
}
.button{
  display: flex;
  align-items: center ;
  margin-bottom: 10%;
}
@media (min-width: 100px) and (max-width: 600px){
  .corps{
    height: 25rem;
  }
  .form{
    display: flex;
    flex-direction: column;
  }
}
</style>