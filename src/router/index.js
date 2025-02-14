import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import AppLayoutFooter from '@/layout/AppLayoutFooter.vue';

const router = createRouter({
    //history: createWebHashHistory(),
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'initial',
                    component: () => import('@/views/Initial.vue'),
                    meta:{
                        requireAuth: false
                    }
                },
                {
                    path: '/blog',
                    name: 'blog',
                    component: () => import('@/views/pages/blog/Blog.vue'),
                    meta:{
                        requireAuth: false
                    }
                },
                {
                    path: '/center',
                    name: 'center',
                    component: () => import('@/views/pages/centers/Center.vue'), /* '@/views/pages/centers/CenterDetail.vue' */
                    meta:{
                        requireAuth: false
                    }
                },
                {
                    path: '/onlinePsychologists',
                    name: 'online psychologist',
                    component: () => import('@/views/pages/OnlinePsychologists.vue'),
                    meta:{
                        requireAuth: false
                    }
                },
                {
                    path: '/contactForm',
                    name: 'Contact Form',
                    component: () => import('@/views/pages/Contact.vue'),
                    meta:{
                        requireAuth: false
                    }
                }
            ]
        },
        {
            path: '/login',
            component: AppLayoutFooter,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/pages/authentication/Login.vue'),
                    meta:{
                        requireAuth: false
                    }
                }
            ]
        },
        /* Agrege ruta a detalle de centro */
        {
            path: '/centerDetail',
            component: AppLayout,
            children: [
                {
                    path: '/centerDetail/:id',
                    name: 'centerDetail',
                    component: () => import('@/views/pages/centers/CenterDetail.vue'),
                    meta:{
                        requireAuth: false
                    }
                }
            ]
        },
        {
            path: '/blogDetail',
            component: AppLayout,
            children: [
                {
                    path: '/blogDetail/:id',
                    name: 'blogDetail',
                    component: () => import('@/views/pages/blog/DetailBlog.vue'),
                    meta:{
                        requireAuth: false
                    }
                }
            ]
        },
        {
            path: '/settings',
            //component: AppLayout,
            children: [
                {
                    path: '/settings',
                    name: 'Configuracion',
                    component: () => import('@/views/pages/Settings.vue'),
                    meta:{
                        requireAuth: true
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to,from,next)=>{
    const authNow = sessionStorage.getItem('tokenWeb') !== null && sessionStorage.getItem('tokenWeb') !== '';
    const needAuth = to.meta.requireAuth;

    if(needAuth && !authNow){
        next('login');
    }else{
        next();
    }
})

export default router;