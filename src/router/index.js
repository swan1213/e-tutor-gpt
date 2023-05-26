import { createWebHistory, createRouter } from "vue-router"

import SignIn from "@/views/auth/signin/Signin.vue"
import SignUp from "@/views/auth/signup/Signup.vue"
import Home from "@/views/home"

const routes = [
    {
        path: "/",
        name: "signin",
        component: SignIn,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = localStorage.getItem('jwtToken');
            if (!isLoggedIn) {
              next({ name: 'signin' });
            } else {
              next();
            }
        },
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;