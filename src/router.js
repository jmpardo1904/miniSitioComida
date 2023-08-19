import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/user/LoginForm.vue";
import HomePage from "./components/HomePage.vue";
import RegisterForm from "./components/user/RegisterForm.vue";
import CartPage from './views/CartPage.vue'

const routes = [
  { path: "/LoginForm", component: Login },
  { path: "/HomePage", component: HomePage, meta: { requiresAuth: true } },
  { path: "/RegisterForm", component: RegisterForm },
  {
    path: "/CartPage",
    component: CartPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),  
  routes,
});


router.beforeEach((to, from, next) => {
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if (!localStorage.getItem("token")) {
      
      next({ path: "/LoginForm" });
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router;
