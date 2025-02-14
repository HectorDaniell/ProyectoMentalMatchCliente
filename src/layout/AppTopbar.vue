<script setup>
import { ref, computed, onMounted, onBeforeUnmount,watch  } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter,useRoute } from 'vue-router';

import { useStore } from 'vuex';


const store = useStore();
//const tokenJwt = computed(()=> store.state.token);
//const emailUser = computed(()=> store.state.email);
const tokenJwt = sessionStorage.getItem('tokenWeb');
const emailUser = sessionStorage.getItem('emailUser');

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const route = useRoute();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

//Sidebar ocultar
onMenuToggle()

const logoUrl = computed(() => {
    return `layout/images/iconos/image_logo.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const loginCustomer = () => {
    router.push('/login');
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            //Se comenta por momento
            /*if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }*/
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const logOutUser = () => {
    sessionStorage.clear();
    location.reload();
}

const settings = ()=>{
    router.push('/settings');
}
//Se comenta por momento
/*const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};*/

const active = ref(0);
const items = ref([
    {
        label: 'Inicio',
        icon: '',
        route: '/'
    },
    {
        label: 'Blog',
        icon: '',
        route: '/blog'
    },
    {
        label: 'Centros',
        icon: '',
        route: '/center'
    },
    {
        label: 'Psicologos Online',
        icon: '',
        route: '/onlinePsychologists'
    }
]);

onMounted(() => {
    active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path);
})

watch(
    route,
    () => {
        active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path);
    },
    { immediate: true }
);


</script>

<template>


<div class="surface-overlay px-6 shadow-2 flex justify-content-between relative lg:fixed w-full z-5 " style="min-height: 65px">
    <img :src="logoUrl" alt="Image" height="40" class="mr-0 lg:mr-6 align-self-center">
    <a v-ripple class="cursor-pointer block lg:hidden align-self-center text-700 mt-1 p-ripple"
        v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
        <i class="pi pi-bars text-4xl"></i>
    </a>
    <div class="flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 z-1 shadow-2 lg:shadow-none">
        <ul class="list-none p-0 m-0 flex select-none flex-column lg:flex-row">
            <li v-for="item in items" >
                <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
                        <a v-ripple :href="routerProps.href"  class="flex px-6 p-3 h-full lg:px-3 lg:py-2 align-items-center text-600 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150 p-ripple">
                            <span v-bind="item.label.value">{{ item.label }}</span>
                        </a>
                </router-link>
            </li>
        </ul>
        <ul class="list-none p-0 m-0 flex select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none">
            <li v-if="tokenJwt == null || tokenJwt == undefined || tokenJwt.trim() == ''">
                <a v-ripple class="flex px-6 p-3 h-full lg:px-3 lg:py-2 align-items-center text-600 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <Button @click="loginCustomer()" class = "p-button-sm" label = "INICIAR SESION" rounded />
                </a>
            </li>
            <li v-if="tokenJwt == null || tokenJwt == undefined || tokenJwt.trim() == ''">
                <a v-ripple class="flex px-6 p-3 h-full lg:px-3 lg:py-2 align-items-center text-600 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary  font-medium cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <Button @click="onTopBarMenuButton()" class = "p-button-sm" label = "¿ERES PSICOLOGO?" outlined rounded />
                </a>
            </li>
            <li class="border-top-1 surface-border lg:border-top-none" v-if="tokenJwt != null && tokenJwt != undefined && tokenJwt.trim() != ''">
                <a v-ripple class="flex px-6 p-3 h-full lg:px-3 lg:py-2 align-items-center text-600 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150 p-ripple" @click="settings()">
                    <img :src="logoUrl" class="mr-3 lg:mr-0" style="width: 28px; height: 28px"/>
                    <div class="block lg:hidden">
                        <div class="text-900 font-medium">Usuario Prueba</div>
                        <span class="text-600 font-medium text-sm">Marketing Specialist</span>
                    </div>
                </a>
            </li>
            <li v-if="tokenJwt != null && tokenJwt != undefined && tokenJwt.trim() != ''">
                <a v-ripple class="flex px-6 p-3 h-full lg:px-3 lg:py-2 align-items-center text-600 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150 p-ripple" @click="logOutUser()">
                    <i class="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i>
                    <span class="block lg:hidden font-medium">Cerrar Sesion</span>
                </a>
            </li>
            
            
        </ul>
    </div>
</div>
    
    



</template>

<style lang="scss" scoped></style>