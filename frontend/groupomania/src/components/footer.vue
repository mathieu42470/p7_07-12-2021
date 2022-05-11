<template>
<footer>
  <!-- footer de toutes les pages du site  -->
     <img class="imgroupomania" src="../../images/icon-left-font-monochrome-white.png">
     <div class="footersite">
       <a href="">qui sommes nous</a>
       <a href="">nos partenaire</a>
     </div>
     <div class="footersite">
        <a href="">mentions légales</a>
        <a href="">aide</a>
     </div>
</footer>               
</template>
<script>
export default {
     name: 'Footer',
     props: {
         msg: String
  }
}
</script>
<style>
footer{  
   background-color: rgb(253, 45, 1);
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 100%;
    height: 10rem;
}
.imgroupomania{
  margin-left: 8%;
  display: flex;
  align-self: center;
}
.footersite {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   margin-right: 8%;
}
a{
  list-style: none;
  color: white; 
}
</style>