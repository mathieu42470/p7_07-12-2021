<template>
       <div class="home">
          <Header/>
          <div> 
               <OnePost/>
               <Comment/>
          </div>
          <Footer/>
       </div>        
</template>
<script>
// troisieme page //
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import OnePost from '../components/onepost.vue'
import Comment from '../components/commentaire.vue'

export default {
                name: 'HomeView',
                  components: {
                      Header, OnePost, Comment, Footer  
                  }, 
}
</script>
<style>
.home{
               width: 100%;
}
</style>