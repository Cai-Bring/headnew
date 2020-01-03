import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'


let router = new VueRouter({
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'Personal',
            path: '/personal',
            component: Personal
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal') === 0) {
        let token = localStorage.getItem('key')
        if (token) {
            next()
        } else {
            next({ name: 'Login' })
        }
    } else {
        next()
    }
})

export default router