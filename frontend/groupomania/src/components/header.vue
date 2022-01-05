<template>
<header>
   <div>
     <img src="../../images/icon-left-font.png" >
     <div>
       <button> connexion </button>
     </div>
   </div>
</header>
</template>

<script>
export default {
  name: 'header',
  props: {
    msg: String
  }
}
</script>

<style >
header div{
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
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
