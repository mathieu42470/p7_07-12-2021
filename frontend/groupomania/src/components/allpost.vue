<template>
      <div>
            <article class="article" >
                   <div class="nom">
                    <a class="firstname"> {{user.firstname}}</a>
                    <a class="lastname"> {{user.lastname}}</a>
                   </div>
                   <div class="text">
                         <a class="text"> {{post.text}}</a>
                         <a class="url"> {{post.url_image}}</a>
                   </div> 
                   <button class="like">j'aime</button>                 
            </article>                  
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
      post: {        
        text: '',
        url_image:''
      },
      user: {
        firstname: '',
        lastname: ''
        }
  };                           
  },
 created() {
         fetch('http://localhost:3000/api/post/',{
               method : 'GET',
               headers : {"Authorization" : "Bearer "+localStorage.getItem("Token")},
               body: JSON.stringify(this.data)
         })          
         .then(response => response.json(this.data))       
         .then(data =>{
               (this.data = data.total) 
              console.log(this.data)  
         })
         
  }          
};
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