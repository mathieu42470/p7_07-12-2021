<template>
     <div class="corps">
         <h1>connexion</h1>
         <!-- formulaire pour se connecter sur le site internet -->
         <form method="post" class="form1" name="connexion">
                <div class="form">
                      <label for="email">Adresse e-mail : </label>         
                      <input type="email" name="email"  v-model="user.email"/>             
                </div>
                <div class="form">
                      <label for="password">mot de passe : </label>
                      <input type="password"  name="password" v-model="user.password"/>
                </div>
                <div>           
                       <input v-on:click="Envoi" class="button" type="button" value='envoyer'/>
          </div>
          </form> 
     </div>       
</template>
<script>
export default {
  name: 'connexion',
  props: {
  msg: String,
  isconnected:Boolean      
  },
  data() {
      return {
            user:{
                  email: '',
                  password: ''
            }              
      }
  },
  methods: {
      // envoie des données a la base de données pour la connexion d'une personne  //
        Envoi(e){    
             e.preventDefault();
                   fetch('http://localhost:3000/api/user/login',{
                   method: 'POST',
                   headers:{"Content-Type":"application/json"},
                   body : JSON.stringify(this.user)
             })
             .then((data) => data.json()).then((result) =>{ 
  // retour de certaine données et envoyé dans session storage pour etre récupérer ensuite sur une autre page //
                   sessionStorage.setItem("userid", result.user.id_user)                
                    sessionStorage.setItem("Token",result.token)
                    sessionStorage.setItem("user_type", result.user.user_type)  
                    // envoie de la personne sur une autre page  // 
                   this.$router.push("/about")      
            }) 
        }
  },
} 
</script>
<style>
.corps {
     height: 20rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%
}
.form1{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2%;
    border: solid black;
    border-radius: 20px;
    width: 80%;
}
</style>