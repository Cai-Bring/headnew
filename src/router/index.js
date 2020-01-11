import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import Register from '@/views/Register.vue'
import EditPersonal from '@/views/EditPersonal.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import Myfollow from '@/views/Myfollow.vue'
import Mylike from '@/views/Mylike.vue'
import Comment from '@/views/Comment.vue'
import Addclass from '@/views/Addclass.vue'
import Search from '@/views/Search.vue'


let router = new VueRouter({
    routes: [
        {
            name: 'Index',
            path: '/',
            component: Index
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'Personal',
            path: '/personal/:id',
            component: Personal
        },
        {
            name: 'Register',
            path: '/register',
            component: Register
        },
        {
            name: 'EditPersonal',
            path: '/editPersonal/:id',
            component: EditPersonal
        },
        {
            name: 'ArticleDetail',
            path: '/articleDetail/:id',
            component: ArticleDetail
        },
        {
            name: 'Myfollow',
            path: '/myfollow/:id',
            component: Myfollow
        },
        {
            name: 'Mylike',
            path: '/mylike/:id',
            component: Mylike
        },
        {
            name: 'Comment',
            path: '/comment/:id',
            component: Comment
        },
        {
            name: 'Addclass',
            path: '/addclass',
            component: Addclass
        },
        {
            name: 'Search',
            path: '/search',
            component: Search
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