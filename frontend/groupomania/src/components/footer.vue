<template>
<footer>
     <img src="../../images/icon-left-font-monochrome-white.png">
     <div class="quisommesnous">
       <a href="">qui sommes nous</a>
       <a href="">nos partenaire</a>
     </div>
     <div class="aide">
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
.quisommesnous {
   display: flex;
   flex-direction: column;
   align-items: center;
}
.aide{
  display: flex ;
  flex-direction: column;
  height: 100%;
  align-items: center;
}
a{
  list-style: none;
  color: white; 
}
</style>