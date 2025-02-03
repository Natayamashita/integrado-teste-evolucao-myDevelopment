<template>
  <main class="container content" style="color: white; display: flex; flex-direction: column; background-color: gray">
    <div class="filter_layout">
      <div style="width: 100%; display: flex; align-items: flex-end; margin-bottom: 5px">
        <h1>Display de produtos</h1>
        <button @click="filter_display" style="margin-left: auto;">
          <img src="../assets/filter.png" style="width: 30px; height: 30px" />
        </button>
        <button @click="logout" style="margin-left: 10px;">
          <img src="../assets/exit.png" style="width: 30px; height: 30px" />
        </button>
      </div>
      <div style="display: flex; width: 100%; align-items: flex-start; flex-wrap: wrap; gap: 20px;" id="filter_display">
        <div style="flex: 1; margin-right: 10px;">
          <h4>Data a partir de:</h4>
          <input style="width: 90%; padding: 3px;" />
          <h4>Data até:</h4>
          <input style="width: 90%; padding: 3px;" />
        </div>

        <div @change="name_input" style="display: flex; flex-direction: column; flex: 1; margin-right: 10px;">
          <h4>Nome</h4>
          <input style="flex: 1; width: 90%; padding: 3px;" />
          <div style="flex: 1;" id="sku_input" @change="sku_input">
            <h4>SKU:</h4>
            <input style="width: 90%; padding: 3px;" />
          </div>
        </div>


        <div style="margin-left:20px">
          <h4>Status:</h4>
          <select id="status" name="status" style="width: 100px; padding:3px; border-radius:0px">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
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
        <tr v-for="item in paginator" :key="item.value">
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
    <div style="display: flex; justify-content: flex-end; margin: 10px; gap: 5px;">
      <button style="padding: 10px" @click="prevPage">Previous</button>
      <button style="padding: 10px" @click="nextPage">Next</button>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Courier New', Courier, monospace;
}

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
      pageSize: 10,
      currentPage: 1,
      array_products_to_display: []
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.array_products.length) this.currentPage++;
    },
    async loadpage() {
      try {
        this.array_products = await axios
          .get("https://6735fdf65995834c8a94f2fd.mockapi.io/api/v4/products")
          .then(response => {
            return response.data;
          });
        this.array_products_to_display = this.array_products;
      } catch (error) {
        console.log("Error: " + error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    filter_display() {
      const filter = document.getElementById("filter_display");
      filter.style.display = filter.style.display === "none" ? "flex" : "none";
    },
    sku_input(ev) {
      if (ev.target.value === "") {
        this.array_products_to_display = this.array_products;
        return;
      }

      this.array_products_to_display = this.array_products_to_display.filter((item) => {
        return item.sku.toLowerCase().includes(ev.target.value.toLowerCase());
      });
    },
    name_input(ev) {
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
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;

      return this.array_products_to_display.slice(start, end);
    }
  },
};
</script>
