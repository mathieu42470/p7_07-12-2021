<template>
  <div class="home">
    <Header :isconnected='isconnected' />
   <div class="formulaire">
     <Form/>
     <Connexion :isconnected='isconnected'/>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
 import Header from '@/components/header.vue'
import Footer from '../components/footer.vue'
import Connexion from '../components/connexion.vue'
import Form from '../components/form.vue'

export default {
  name: 'HomeView',
  components: {
    Header, Form, Connexion, Footer
  },
  data(){
    return {
    isconnected : true
    }
  },
  methods:{
    changeIsConnected(pisconnected){
      this.isconnected = pisconnected
    }
  }
 
}
</script>
<style >
   .home{
     display: flex;
     flex-direction: column;      
   }
    .formulaire{
         display: flex;
         flex-direction: row;
       }
</style>
