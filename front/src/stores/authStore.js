import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth_token: localStorage.getItem('token') || null
  }),
  actions: {
    setToken(token) {
      console.log("token salvando", token)
      this.auth_token = token;
      localStorage.setItem('token', token);
    },
    clearToken() {
      this.auth_token = null;
      localStorage.removeItem('token');
    },
    async validateToken() {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/validateToken", {
        method: "POST",
        body: JSON.stringify({
          token: token
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const server_response = await response.json();
      return server_response.message;
    }
  }
});

export default useAuthStore;
