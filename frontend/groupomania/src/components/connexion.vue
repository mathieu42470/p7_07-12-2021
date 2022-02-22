<template>
     <div class="corps">
         <h1>connexion</h1>
         <form method="post" class="form1" name="connexion">
                <div class="form">
                      <label for="email">email: </label>         
                      <input type="email" name="email"  v-model="user.email"/>             
                </div>
                <div>
                      <label for="password">mot de passe: </label>
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
  msg: String      
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
         async Envoi(){   
           // var puser =   await JSON.stringify(this.user)      
            
            
            let stringifi = {email:  this.user.email, password : this.user.password}
            console.log(stringifi.toString());
            const res = await fetch('http://localhost:3000/api/user/login',{
                  headers:{
                        'Accept':'application/json'
                  },
                  method: 'POST',
                  body : JSON.stringify(stringifi)
             });
            if(res.ok){
                  console.log('cool')
            }
            //  .then((data) => data.json())
            //  .then((result) =>{ 
            //        console.log(result);           
            // }) 
        }
  }
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
    width: 100%;
}
 .form {
    display: flex;
    align-items: center;
    margin: 2px;
 }
.button{
    display: flex;
    align-items: center ;
}

</style>