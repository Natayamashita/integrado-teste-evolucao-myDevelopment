<template>
  <main
    class="container content"
    style="color: white; display: flex; flex-direction: column; background-color: gray">
    <div class="filter_layout">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <button @click="filter_display" style="">
          <img src="../assets/filter.png" style="width: 40px; height: 40px" />
        </button>
        <button @click="logout" style="align-self: end">
          <img src="../assets/exit.png" style="width: 40px; height: 40px" />
        </button>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          justify-content: space-between;"
        id="filter_display">
        <div style="">
          Filtro por data:<br />
          <div style="">
            <h4>de:</h4>
            <input />
            <h4>para:</h4>
            <input />
          </div>
        </div>
        <div @change="name_input" style="display: flex; flex-direction: column">
          <h4>Nome</h4>
          <input style="flex" />
        </div>
        <div style="" id="sku_input" @change="sku_input">
          SKU:
          <br />
          <input />
        </div>
        <div style="">
          <div style="">
            <div style="">
              <p style="">Status:</p>
              <select id="status" name="status">
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
          <th style="padding: 8px; background-color: black">Nome</th>
          <th style="padding: 8px; background-color: black">Data</th>
          <th style="padding: 8px; background-color: black">SKU</th>
          <th style="padding: 8px; background-color: black">Descrição</th>
          <th style="padding: 8px; background-color: black">status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in array_products_to_display" :key="item.value">
          <td style="border: 1px solid black; padding: 5px">{{ item.name }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.created_at }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.sku }}</td>
          <td style="border: 1px solid black; padding: 5px">{{ item.description }}</td>
          <td style="border: 1px solid black; padding: 5px" v-if="(item.status = true)">
            active
          </td>
          <td style="border: 1px solid black; padding: 5px" v-else>inactive</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </div>
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
  padding: 2px;
}
</style>

<script>
import axios from "axios";
// import productApi from '../router/productApi.js';

export default {
  data() {
    return {
      array_products: [],
      array_products_to_display: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  methods: {
    nextPage: async function () {
      console.log("teste")
      if (this.currentPage * this.pageSize < this.array_products.length) this.currentPage++;
    },
    async loadpage() {
      try {
        this.array_products = await axios
          .get("https://6735fdf65995834c8a94f2fd.mockapi.io/api/v4/products")
          .then(response => {
             return response.data;
          })
          // .then((response) => {
          //   return response.data.filter((row, index) => {
          //     let start = (this.currentPage - 1) * this.pageSize;
          //     let end = this.currentPage * this.pageSize;
          //     if (index >= start && index < end) return true;
          //   });
          // }
        // );
          console.log(this.array_products,"products_returned");
        this.array_products_to_display = this.array_products;
      } catch (error) {
        console.log("Error: " + error);
      }
    },
    prevPage: async function () {
      if (this.currentPage > 1) this.currentPage--;
    },
    filter_display() {
      const filter = document.getElementById("filter_display");
      filter.style.display = filter.style.display === "none" ? "flex" : "none";
    },
    sku_input(ev) {
      console.log(ev.target.value);
      console.log(this.array_products_to_display);
      if (ev.target.value === "") {
        this.array_products_to_display = this.array_products;
        return;
      }

      this.array_products_to_display = this.array_products_to_display.filter((item) => {
        return item.sku.toLowerCase().includes(ev.target.value.toLowerCase());
      });
    },
    name_input(ev) {
      console.log(ev.target.value);
      console.log(this.array_products_to_display);
      if (ev.target.value === "") {
        this.array_products_to_display = this.array_products;
        return;
      }

      this.array_products_to_display = this.array_products_to_display.filter((item) => {
        return item.name.toLowerCase().includes(ev.target.value.toLowerCase());
      });
    },
    logout() {
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login";
    },
  },
  async mounted() {
    this.loadpage();
  },
  computed: {
    paginator() {
      console.log("PAGINANDO")
      this.array_products_to_display = this.array_products.filter((row, index) => {
        console.log(row,"ROW")
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
      });
    }
  },
};
</script>
