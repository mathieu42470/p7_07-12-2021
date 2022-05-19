<template>
  <div class="about">
    <Header/>
    <Create/>
    <Allpost/>  
    <Footer/>
  </div>
</template>
<script>
// deuxieme page //
 import Header from '@/components/header.vue'
import Footer from '../components/footer.vue'
 import Allpost from '../components/allpost.vue'
  import Create from '../components/createpost.vue'
export default {
   name: 'HomeView',
  components: {
    Header,Allpost, Create, Footer
  }
}
</script>