<template>
            <article key="messages">
              <div class="name">
                <p>{{messages.firstname}}</p>
                <p>{{messages.lastname}}</p>
              </div>
              <div class="text">
                <p>{{messages.text}}</p>
               <img :src="messages.url_image">
              </div>
              <div class="comment">
              </div>
            </article>   
</template>
<script>
export default {
     name : 'onePost',
     props : {
         msg: String
  },
  data(){
    return{
      messages: null,
    }
  },
  created (){
    
    fetch('http://localhost:3000/api/post/:id', {
      method: 'GET',
       headers: {"Content-Type": "application/json" ,"Authorization": "Bearer "+sessionStorage.getItem('Token')},
    }).then(res => res.json())
    .then(resJson =>{
      this.messages = resJson.message
      console.log(this.messages)
    }
    )
  }
}
</script>
<style>

</style>