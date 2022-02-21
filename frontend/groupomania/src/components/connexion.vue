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
          </form> 
     </div>       
</template>
<script>
export default {
  name: 'connexion',
  props: {
  msg: String      
  }
} 
</script>
<style lang="scss">

</style>