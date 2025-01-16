import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProductView from '@/views/ProductView.vue';
import UpdateProductView from '@/views/UpdateProductView.vue';
import CreateUserView from '@/views/CreateUserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'startsida',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'produkter',
      component: ProductView,
      meta: {
        requireAuth: true       // Skyddad rutt
      }
    },
    {
      path: '/update-product/:id',
      name: 'UpdateProductView',
      component: UpdateProductView,
      props: true,
      meta: {
        requireAuth: true       // Skyddad rutt
      }
    },
    {
      path: '/createuser',
      name: 'CreateUserView',
      component: CreateUserView,
    }
  ],
})

// Kontroll av autentisering för rutter, skicka tillbaka till startsidan vid alla error
import axios from 'axios';

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    try {
      const response = await axios.get(`https://zoox-privat-backend.onrender.com/products`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        next();
      } else {
        alert("Du måste logga in för att komma åt produkter.");
        next("/");
      }
    } catch (error) {
      alert("Du måste logga in för att komma åt produkter.");
      console.error(error);
      next("/");
    }
  } else {
    next();
  }
});

export default router
