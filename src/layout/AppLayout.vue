<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from './AppTopbar.vue';
import { useLayout } from '@/layout/composables/layout';
import MainFooter from '@/components/MainFooter.vue';

const { changeThemeSettings, layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    //Comment por mientras
    /*if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }*/
});

const onChangeTheme = (theme, mode) => {
    try {
        /* console.log('Cambiando tema:', theme); */

        const elementId = 'theme-css';
        const linkElement = document.getElementById(elementId);

        if (!linkElement) {
            console.error(`No se encontró un elemento con id '${elementId}'.`);
            return;
        }

        /* console.log('Cambiando tema:', theme); */
        const cloneLinkElement = linkElement.cloneNode(true);
        const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
        cloneLinkElement.setAttribute('id', elementId + '-clone');
        cloneLinkElement.setAttribute('href', newThemeUrl);
        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', elementId);
            changeThemeSettings(theme, mode === 'dark');
        });
        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    } catch (error) {
        console.error('Error al cambiar el tema:', error);
    }

};


onChangeTheme('lara-light-teal', 'light');

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': layoutConfig.ripple.value
    };
});



const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
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
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <!--<div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>-->
        <div class="second-layout-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>

        </div>
        <MainFooter></MainFooter>
        <!--<app-config></app-config>-->
        <!--<div class="layout-mask"></div>-->
    </div>
</template>

<style lang="scss" scoped>

    @media screen and (max-width: 700px) {
        /* Responsive*/
        .second-layout-container {
            padding-top:0px;
        }
    }

</style>