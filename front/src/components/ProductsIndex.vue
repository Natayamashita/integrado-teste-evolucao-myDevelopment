<template>
  <main class="container content" style="color:white; display:flex; flex-direction:column; background-color: gray">
    <div class="filter_layout">
      <button @click="filter_display" style="width: 40px; height: 40px; background-color: white">
        <img src="../assets/filter.png" style="width:40px; height: 40px;">
      </button>
      <div style="display:flex; justify-content: space-between; justify-content: space-between" id="filter_display">
        <div style="">
          Filtro por data:<br>
          <div style="">
            <h4>de:</h4> 
            <input /> 
            <h4>para:</h4> 
            <input />
          </div>
        </div>
        <div @change="name_input" style="display:flex; flex-direction: column;">
          <h4>Nome</h4> 
          <input style="flex"/>
        </div>
        <div style="" id="sku_input" @change="sku_input">
          SKU:
          <br>
          <input />
        </div>
        <div style="">
          <div style="">
            <div style="">
              <p style="">Status:</p>
              <select id="status" name="status" style="padding: 10px;">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="padding: 8px; background-color:black">Nome</th>
          <th style="padding: 8px; background-color:black">Data</th>
          <th style="padding: 8px; background-color:black">SKU</th>
          <th style="padding: 8px; background-color:black">Descrição</th>
          <th style="padding: 8px; background-color:black">status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in array_products_to_display" :key=item.value>
          <td style="border: 1px solid black; padding: 5px">{{ item.name }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.created_at }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.sku }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.description }}</td>
          <td style="border: 1px solid black; padding: 5px" v-if="item.status = true">active</td>
          <td style="border: 1px solid black; padding: 5px" v-else>inactive</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>

.filter_layout {
  padding: 20px;
  background-color: black;
}
button:hover {
  cursor: pointer;
}
input {
  padding: 2px
}

</style>

<script>

import axios from 'axios';
// import productApi from '../router/productApi.js';

export default {
  data() {
    return {
      array_products: [],
      array_products_to_display: []
    }
  },
  methods: {
    filter_display() {
      const filter = document.getElementById('filter_display');
      filter.style.display = filter.style.display === 'none' ? 'flex' : 'none';
    },
    sku_input(ev) {
      console.log(ev.target.value)
      console.log(this.array_products_to_display)
      if(ev.target.value === '') {
        this.array_products_to_display = this.array_products;
        return;
      };

      this.array_products_to_display = this.array_products_to_display.filter((items) => {
        return items.sku === ev.target.value;
      })
    },
    name_input(ev) {
      console.log(ev.target.value)
      console.log(this.array_products_to_display)
      if(ev.target.value === '') {
        this.array_products_to_display = this.array_products;
        return;
      };
      
      this.array_products_to_display = this.array_products_to_display.filter((items) => {
        return items.name === ev.target.value;
      })
    }
  },
  async mounted() {
    this.array_products = await axios.get('https://6735fdf65995834c8a94f2fd.mockapi.io/api/v4/products')
      .then((response) => {
        return response.data
      });
    this.array_products_to_display = this.array_products;
  }
}

</script>