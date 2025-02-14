<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import UserInformation from '@/components/information/UserInformation.vue'
import UserAppointments from "@/components/information/UserAppointments.vue";
const router = useRouter();
const activeTab3 = ref()
window.scrollTo({ top: 0 });


const irInicio = ()=>{
    router.push('/');
} 
</script>

<template>
    <div class="flex flex-column bg-black-alpha-90 ">
        <div class="flex flex-column flex-auto bg-black-alpha-90">
            <div class="surface-section px-4 py-4 lg:py-2 lg:px-6 h-full ">
                <div class="grid">
                    <ul class="md:col-2 list-none md:m-0 md:p-0 md:flex flex-row  lg:flex-column lg:justify-content-start ">
                        <li class="md:px-1">
                            <h2 class="mt-6 mb-5 text-900 font-medium text-2xl">Configuraciones</h2>
                        </li>
                        <li>
                            <a v-ripple
                                class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                                :class="{ 'surface-200': activeTab3 === 0 }" @click="activeTab3 = 0">
                                <i class="pi pi-user md:mr-2"
                                    :class="{ 'text-700': activeTab3 === 0, 'text-600': activeTab3 !== 0 }"></i>
                                <span class="font-medium  md:block"
                                    :class="{ 'text-800': activeTab3 === 0, 'text-700': activeTab3 !== 0 }"> Informacion de
                                    usuario</span>
                            </a>
                        </li>
                        <li>
                            <a v-ripple
                                class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                                :class="{ 'surface-200': activeTab3 === 1 }" @click="activeTab3 = 1">
                                <i class="pi pi-calendar-times md:mr-2"
                                    :class="{ 'text-700': activeTab3 === 1, 'text-600': activeTab3 !== 1 }"></i>
                                <span class="font-medium  md:block"
                                    :class="{ 'text-800': activeTab3 === 1, 'text-700': activeTab3 !== 1 }"> Mis citas</span>
                            </a>
                        </li>
                        <li @click="irInicio()">
                            <a v-ripple
                                class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors">
                                <i class="pi pi-chevron-circle-left md:mr-2"></i>
                                <span class="font-medium  md:block" > Volver al inicio</span>
                            </a>
                        </li>
                    </ul>
                
                    <TabView class="md:col-10  p-0" v-model:activeIndex="activeTab3" >
                        <TabPanel :disabled="true" headerStyle="display: none"  >
                            <UserInformation></UserInformation>
                        </TabPanel>
                        
                        <TabPanel headerStyle="display: none"  >
                            <UserAppointments></UserAppointments>
                        </TabPanel>
                    </TabView>

                </div>
            </div>

        </div>

    </div>
</template>



<style  scoped>

</style>