
<template>
  <form action="" method="get" class="form-example" style="background-color:white">
    <h1> 
      Register
    </h1>
    <div class="form-example">
      <label for="name">Enter your name: </label>
      <input type="text" name="name" id="name" required />
    </div>
    <div class="form-example">
      <label for="email">Enter your email: </label>
      <input type="email" name="email" id="email" required />
    </div>
    <div class="form-example">
      <label for="email">Enter your password: </label>
      <input type="email" name="email" id="email" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Register!" />
    </div>
  </form>
</template>
  
  <style scoped>
  .content {
    padding-top: 3rem;
  }
  
  </style>
  
  <script>
  
  import axios from 'axios';
  // import productApi from '../router/productApi.js';
  
  export default {
    data() {
      return {
        
      }
    },
  
    async mounted() {
      
    }
  }
    
  </script>