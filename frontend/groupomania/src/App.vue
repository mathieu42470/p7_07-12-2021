<template>
  <div id="app">
    <nav>
      <homelink />
      <a href="/about"> A propos </a>
      <a href="/contact"> Contact</a>
    </nav>
    <p>Bienvenue sur notre page d'<homelink /></p>
    <!-- <img alt="Vue logo" src="./assets/logo.png">

    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  components: { HelloWorld },
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
