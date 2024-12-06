
<template>
  <div class="container content" style="color:white; display:flex; flex-direction:column; background-color: gray">
    <div v-for="item in array_products" style="display:flex; flex-direction: row; padding: 10px; background-color:rgb(60, 60, 60); border: solid; border-color: white">
      <p> Nome: {{ item.name }} </p>
      <p> Sku: {{ item.sku }} </p>
      <p> Description: {{ item.description	 }} </p>
    </div>
  </div>
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
      array_products: []
    }
  },

  async mounted() {
    this.array_products = await axios.get('https://6735fdf65995834c8a94f2fd.mockapi.io/api/v4/products')
      .then((response) => {
        return response.data
    });
  }
}
  
</script>