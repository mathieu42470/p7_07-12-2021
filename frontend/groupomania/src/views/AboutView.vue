<template>
  <div class="about">
    <Header/>
    <Create/>
   
    <Footer/>
  </div>
</template>
<script>
 import Header from '@/components/header.vue'
import Footer from '../components/footer.vue'

  import Create from '../components/createpost.vue'
export default {
 

  name: 'HomeView',
  components: {
    Header, Create, Footer
  }
}
</script>