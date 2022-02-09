<template>
  <div id="app">
    <div id="nav">
      <Header />
      <Form />
      <Footer/>
    </div>
    <router-view/>
  </div>
</template>

<script>

import Header from './components/header.vue'
import Form from './components/form.vue'
import Footer from './components/footer.vue'

export default {
  components: { Header, Form, Footer },
  name: 'App',
 }
 
</script>

<style>
</style>
