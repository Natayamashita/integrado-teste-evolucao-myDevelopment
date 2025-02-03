<template style="height: 100%">
  <section style="display:flex; width: 100%; height: 100%; justify-content: center;">
  <form @submit.prevent="login" class="form-example" style="background-color:white;" v-if="do_register===true">
    <h1>
      Login
    </h1>
    <div style="">
      <div class="form-example">
        <label for="email">Enter your email: </label>
        <input name="email" id="email" v-model="email_login" required />
      </div>
      <div class="form-example">
        <label for="email">Enter your password: </label>
        <input name="password" id="password" v-model="password_login" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Login!"/>
      </div>
      <a class="register_click_element" @click="do_register = !do_register" style="">
        Don't have an account?
      </a>
    </div>
  </form>
  <form v-else action="" @submit.prevent="register" method="get" class="form-example" style="background-color:white">
    <h1>
      Register
    </h1>
    <div class="form-example">
      <label for="name">Enter your username: </label>
      <input type="text" name="username" id="username" v-model="username" required />
    </div>
   <div class="form-example">
      <label for="email">Enter your email: </label>
      <input name="email" id="email" v-model="email" required />
    </div>
    <div class="form-example">
      <label for="email">Enter your password: </label>
      <input name="password" id="password" v-model="password" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Register!"/>
    </div>
    <a class="register_click_element" @click="do_register = !do_register" style="">
      Log in
    </a>
  </form>
</section>
</template>

<style scoped>
.content {
  padding-top: 3rem;
}
.register_click_element {
  cursor: pointer;
}
form {
  color: black;
  padding: 16px;
}
</style>

<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/authStore.js';

export default {
  computed: {
    ...mapStores(useAuthStore),
  },
  data() {
    return {
      do_register: true,
      username: "",
      email: "",
      password: '',
      email_login: "",
      password_login: "",
    }
  },
  async mounted() {
    console.log('Mounted message:', this.authStore.auth_token);
  },
  methods: {
    async login() {
      console.log("LOGIN")
      try {
        console.log(this.email,this.password)
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          body: JSON.stringify({
            email: this.email_login,
            password: this.password_login
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const server_response = await response.json();
        console.log(server_response)
        window.alert(JSON.stringify(server_response.token));
        window.location.href= "http://localhost:5173/";
        if(server_response.token.length > 0) {
          this.authStore.setToken(server_response.token);
          console.log(this.authStore.auth_token);
          console.log("TESEEEE")
        }
        console.log(this.authStore.auth_token,"auth_token")
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async register() {
      console.log('register');
      try {
        console.log(this.username,this.email,this.password)
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const server_response = JSON.stringify(await response.json());
        window.alert(server_response);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}
</script>
