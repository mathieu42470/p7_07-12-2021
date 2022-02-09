<template>
    <div class="corps">
      <form name="form1" method="POST" action="">
          <div class="form">
             <label class="label" for="firstName">Prénom</label>
             <input id="firstName" class="input" type="text" name="firstName"/>
          </div>
          <div class="form">
             <label class="label" for="lastName">Nom</label>
             <input id="lastName" class="input" type="text" name="lastName"/>
          </div> 
          <div class="form">
             <label class="label" for="email">Adresse e-mail</label>
             <input id="email" class="input" type="email" name="email"/>
          </div>
          <div class="form">
            <label class="label" for="password">mot de passe</label>
            <input id="password" class="input" type="password" name="password" />
          </div>
          <div>           
          <button> s'inscrire </button>
          </div>
          </form>
    </div>
</template>
<script>
export default {
  name: 'Formulaire',
  props: {
    msg: String
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
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
button{
  align-items: center ;
}
</style>