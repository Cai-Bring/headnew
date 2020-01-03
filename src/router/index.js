import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '@/views/Login.vue'

let router = new VueRouter({
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        }
    ]
})

export default router