import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '@/service/Authorization'

Vue.use(VueRouter)

const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth/Auth.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/requests',
        name: 'Requests',
        component: () => import('../views/Requests/Requests.vue'),
        meta: {
            requiresAuth: true,
            myRequests: false
        }
    },
    {
        path: '/my-requests',
        name: 'MyRequests',
        component: () => import('../views/Requests/Requests.vue'),
        meta: {
            requiresAuth: true,
            myRequests: true
        }
    },
    {
        path: '/',
        redirect: '/my-requests'
    },
]

const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.matched.length) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!Authorization.isLogged()) {
                next({
                    path: '/auth',
                })
            } else {
                next()
            }
        } else if (to.path === '/auth' && Authorization.isLogged()) {
            next(from.path)
        } else {
            next()
        }
    } else {
        next({
            path: '/my-requests',
        })
    }
})

export default router
