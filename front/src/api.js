import { useAuthStore } from "./stores/authStore.js";

export async function apiFetch(url, options = {}) {
  const authStore = useAuthStore();
  const token = authStore.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // 🔹 Adiciona o token apenas se existir
  };

  return fetch(url, { ...options, headers });
}
