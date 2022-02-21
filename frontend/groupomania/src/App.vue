<template>
  <div id="app">
    <div id="nav">
      <Header />
      <Form />
      <connexion/>
      <Footer/>
    </div>
    <router-view/>
  </div>
</template>

<script>

import Header from './components/header.vue'
import Form from './components/form.vue'
import Footer from './components/footer.vue'
import connexion from './components/connexion.vue'

export default {
  components: { Header, Form, connexion, Footer },
  name: 'App',
 }
 
</script>

<style>
</style>
