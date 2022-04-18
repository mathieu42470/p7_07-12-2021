<template>
       <div class="home">
          <Header/>
          <div> 
               <OnePost/>
          </div>
          <Footer/>
       </div>        
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import OnePost from '../components/onepost.vue'

export default {
                name: 'HomeView',
                  components: {
                      Header, OnePost, Footer  
                  }, 
}
</script>
<style>
.home{
               width: 100%;
}
</style>