<template>
      <div >
            <div class="article" >
                   <div class="nom">
                    <span v-text="message.author.firstname"></span>
                    <span class="lastname" v-text="message.author.firstname" ></span>
                   </div>
                   <div class="text">
                         <span class="text" v-text="message.text.text"></span>
                         <span class="url" v-text="message.text.text"></span>
                   </div> 
                   <button class="like">j'aime</button>                 
            </div>                  
      </div>        
</template>
<script>
export default {
     name : 'allPost',
     props : {
         msg: String
  },
  data() {
        return{
     
                              
  }
  },
 created()  {
         fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Authorization" : "Bearer "+localStorage.getItem("Token")},
               body: JSON.stringify(this.data)
         })          
         .then(response => response.json(this.data))       
         .then(response =>{
               (this.response = response) 
         })
         
  }          
}

</script>
<style>
.article{
      width: 100%;
      height: 20rem;
      display: flex;
      flex-direction: column;
      border: solid black;
}
.nom{
      width: 50%;
      display: flex;
      flex-direction: row;
}
.text{
      display: flex;
      flex-direction: row;
}
.like 
{
      display: flex;
      width: 50px;
      height: 20px;
}
</style>