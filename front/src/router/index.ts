import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import useAuthStore from '../stores/authStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
    },
  ],
})

// Para caso um dia seja necessário usar o BeforeEach e autenticação em rotas de frontend
router.beforeEach(async (to) => {
  const main = useAuthStore();
  const token = main.auth_token;
  const verify_auth = await main.validateToken();
  console.log(verify_auth,"verificação")
  if (to.meta.requiresAuth && !verify_auth) return '/login'
  if(!to.meta.requiresAuth && verify_auth) return '/';

  if (token) {
    console.log("Token:", token);
  }
})

export default router
