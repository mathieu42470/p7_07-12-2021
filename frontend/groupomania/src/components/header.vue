<template>
<div>
     <img src="../../images/icon-left-font.png" >
     <div>
       <button> se connecter </button>
     </div>
</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  height: 20%;
  width: 100%;
  display: flex;
  align-content: space-between;
  flex-direction: row;
}
img{
   height: 15rem;
   width: 20%;
   display: flex;
   margin: 0%;
}
button{
  display: flex;
  vertical-align: end;
}
</style>
