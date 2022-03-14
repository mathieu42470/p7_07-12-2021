<template>
    <div class="corps">
      <h1>Inscription</h1>
      <form class="form1" name="inscription" method="post" enctype="application/x-www-form-urlencoded" >
          <div class="form">
             <label class="label" for="firstName">Prénom : </label>
             <input id="firstName" type="text" name="firstName" v-model="user.firstname"/>
          </div>
          <div class="form">
             <label class="label" for="lastName">Nom : </label>
             <input id="lastName" type="text" name="lastName"  v-model="user.lastname"/>
           </div> 
          <div class="form">
             <label class="label" for="email">Adresse e-mail : </label>
             <input id="email" type="email" name="email"  v-model="user.email"/>
           
          </div>
          <div class="form">
            <label class="label" for="password">mot de passe : </label>
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
      onsubmit(e) {
      e.preventDefault();
     console.log(this.user)
      fetch('http://localhost:3000/api/user/signup',{
        method : 'POST',
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify(this.user )
      }).then((data) => data.json()).then((result) =>{
        console.log( result)
      })    
     },
}
}
</script>
<style >
.corps{
  height: 20rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
.form1{
   display: flex;
   flex-direction: column;
   align-items: center;
    width: 100%;
}
.form{
  display: flex;
  align-items: center;
  margin: 2px;
}
.button{
  display: flex;
  align-items: center ;
}
</style>