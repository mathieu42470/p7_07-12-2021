<template>
   <header>
     <img src="../../images/icon-left-font-monochrome-white.png" >
     <div>
       <button v-if="sessionstorage =! null" > connexion </button>
       <button v-else>deconnexion</button>
     </div>
   </header>
</template>

<script>
export default {
  name: 'header',
  props: {
    msg: String
  },
  
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
button{
  display: flex;
  height: 20px;
  align-items: center;
}
</style>
