<template>
   <header>
     <img src="../../images/icon-left-font-monochrome-white.png" >
     <a v-on:click="accueil">

       <p  v-if=" this.$route.name ==='home' "></p>
       <button v-else>deconnexion</button>
      
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
  mounted (){
    console.log("je passe là")
    console.log(this.$route.name)
  },
  
  methods:{
    accueil(e){
               e.preventDefault();
                sessionStorage.clear();
                this.isconnected = false;
                this.$router.push('/');               
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
button{
  display: flex;
  height: 20px;
  align-items: center;
}
</style>
