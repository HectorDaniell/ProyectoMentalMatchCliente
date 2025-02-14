<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();
const token = sessionStorage.getItem('tokenWeb');
const email = sessionStorage.getItem('emailUser');

const ratingExample = 3

console.log("core token:",token);
console.log("core email:",email);
</script>

<template >
<div class="h-screen">
    


    <div class="flex align-items-start justify-content-end px-4 py-2 md:px-6 lg:px-8 relative overflow-hidden">

        <Button label="Filtrar" icon="pi pi-filter" outlined 
        v-styleclass="{ selector: '#slideover-3', enterClass: 'hidden', enterActiveClass: 'fadeinright', leaveToClass: 'hidden', leaveActiveClass: 'fadeoutright', hideOnOutsideClick: true }"></Button>

    </div>






    <div class="px-4 py-2 md:px-6 lg:px-8">

        
        

        <div class="surface-card p-4 shadow-2 border-round my-4">
            <div class="grid">
                <div class="col-12 border-300 md:col-6 lg:col-6  border-bottom-2 md:border-bottom-none  md:border-right-2  ">
                    <div class="mb-3 flex flex-column md:flex-row md:align-items-center">
                        <div class="align-items-start">
                            
                            <div class="flex">

                                <Avatar image="/layout/images/iconos/ic_account.svg" class="mr-2 avatar-border max-h-3rem max-w-3rem" size="xlarge" shape="circle" />

                                <div class="pl-3 overflow-hidden w-full">
                                    <div class="white-space-nowrap text-3xl font-semibold text-900 mb-2 overflow-hidden text-overflow-ellipsis w-full">Martin Palermo Hinostroza</div>
                                    <div class="flex flex-wrap justify-content-start gap-2 w-full">
                                        <Tag value="Ansiedad" rounded></Tag>
                                        <Tag value="Depresion" rounded></Tag>
                                        <Tag value="Pareja" rounded></Tag>
                                        <Tag value="Violencia" rounded></Tag>
                                        <Tag value="Suicidio" rounded></Tag>
                                        <Tag value="Bulimia" rounded></Tag>
                                        <Tag value="Anorexia" rounded></Tag>
                                    </div>
                                    <div class="py-1 gap-1 justify-content-start flex flex-wrap " >
                                        <Rating v-model="ratingExample" readonly :cancel="false" />
                                        <Button label="Ver opiniones(3)" link />
                                    </div>
                                </div>
                                
                            </div>
                            <div class="">
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-map-marker text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Av. Independencia 401 - Cercado - Arequipa</span>
                                </div>
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-comment text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Cita individual desde: S/. 60</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-6">
                    <div style="height: 150px" class="border-2 border-dashed surface-border"></div>
                </div>

            </div>

            
            
        </div>

        <div class="surface-card p-4 shadow-2 border-round my-4">
            <div class="grid">
                <div class="col-12 border-300 md:col-6 lg:col-6  border-bottom-2 md:border-bottom-none  md:border-right-2  ">
                    <div class="mb-3 flex flex-column md:flex-row md:align-items-center">
                        <div class="align-items-start">
                            
                            <div class="flex">

                                <Avatar image="/layout/images/iconos/ic_account.svg" class="mr-2 avatar-border max-h-3rem max-w-3rem" size="xlarge" shape="circle" />

                                <div class="pl-3 overflow-hidden w-full">
                                    <div class="white-space-nowrap text-3xl font-semibold text-900 mb-2 overflow-hidden text-overflow-ellipsis w-full">Martin Palermo Hinostroza</div>
                                    <div class="flex flex-wrap justify-content-start gap-2 w-full">
                                        <Tag value="Ansiedad" rounded></Tag>
                                        <Tag value="Depresion" rounded></Tag>
                                        <Tag value="Pareja" rounded></Tag>
                                        <Tag value="Violencia" rounded></Tag>
                                        <Tag value="Suicidio" rounded></Tag>
                                        <Tag value="Bulimia" rounded></Tag>
                                        <Tag value="Anorexia" rounded></Tag>
                                    </div>
                                    <div class="py-1 gap-1 justify-content-start flex flex-wrap " >
                                        <Rating v-model="ratingExample" readonly :cancel="false" />
                                        <Button label="Ver opiniones(3)" link />
                                    </div>
                                </div>
                                
                            </div>
                            <div class="">
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-map-marker text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Av. Independencia 401 - Cercado - Arequipa</span>
                                </div>
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-comment text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Cita individual desde: S/. 60</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-6">
                    <div style="height: 150px" class="border-2 border-dashed surface-border"></div>
                </div>

            </div>

            
            
        </div>

        <div class="surface-card p-4 shadow-2 border-round my-4">
            <div class="grid">
                <div class="col-12 border-300 md:col-6 lg:col-6  border-bottom-2 md:border-bottom-none  md:border-right-2  ">
                    <div class="mb-3 flex flex-column md:flex-row md:align-items-center">
                        <div class="align-items-start">
                            
                            <div class="flex">

                                <Avatar image="/layout/images/iconos/ic_account.svg" class="mr-2 avatar-border max-h-3rem max-w-3rem" size="xlarge" shape="circle" />

                                <div class="pl-3 overflow-hidden w-full">
                                    <div class="white-space-nowrap text-3xl font-semibold text-900 mb-2 overflow-hidden text-overflow-ellipsis w-full">Martin Palermo Hinostroza</div>
                                    <div class="flex flex-wrap justify-content-start gap-2 w-full">
                                        <Tag value="Ansiedad" rounded></Tag>
                                        <Tag value="Depresion" rounded></Tag>
                                        <Tag value="Pareja" rounded></Tag>
                                        <Tag value="Violencia" rounded></Tag>
                                        <Tag value="Suicidio" rounded></Tag>
                                        <Tag value="Bulimia" rounded></Tag>
                                        <Tag value="Anorexia" rounded></Tag>
                                    </div>
                                    <div class="py-1 gap-1 justify-content-start flex flex-wrap " >
                                        <Rating v-model="ratingExample" readonly :cancel="false" />
                                        <Button label="Ver opiniones(3)" link />
                                    </div>
                                </div>
                                
                            </div>
                            <div class="">
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-map-marker text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Av. Independencia 401 - Cercado - Arequipa</span>
                                </div>
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-comment text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Cita individual desde: S/. 60</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-6">
                    <div style="height: 150px" class="border-2 border-dashed surface-border"></div>
                </div>

            </div>

            
            
        </div>

        <div class="surface-card p-4 shadow-2 border-round my-4">
            <div class="grid">
                <div class="col-12 border-300 md:col-6 lg:col-6  border-bottom-2 md:border-bottom-none  md:border-right-2  ">
                    <div class="mb-3 flex flex-column md:flex-row md:align-items-center">
                        <div class="align-items-start">
                            
                            <div class="flex">

                                <Avatar image="/layout/images/iconos/ic_account.svg" class="mr-2 avatar-border max-h-3rem max-w-3rem" size="xlarge" shape="circle" />

                                <div class="pl-3 overflow-hidden w-full">
                                    <div class="white-space-nowrap text-3xl font-semibold text-900 mb-2 overflow-hidden text-overflow-ellipsis w-full">Martin Palermo Hinostroza</div>
                                    <div class="flex flex-wrap justify-content-start gap-2 w-full">
                                        <Tag value="Ansiedad" rounded></Tag>
                                        <Tag value="Depresion" rounded></Tag>
                                        <Tag value="Pareja" rounded></Tag>
                                        <Tag value="Violencia" rounded></Tag>
                                        <Tag value="Suicidio" rounded></Tag>
                                        <Tag value="Bulimia" rounded></Tag>
                                        <Tag value="Anorexia" rounded></Tag>
                                    </div>
                                    <div class="py-1 gap-1 justify-content-start flex flex-wrap " >
                                        <Rating v-model="ratingExample" readonly :cancel="false" />
                                        <Button label="Ver opiniones(3)" link />
                                    </div>
                                </div>
                                
                            </div>
                            <div class="">
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-map-marker text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Av. Independencia 401 - Cercado - Arequipa</span>
                                </div>
                                <div class="flex pl-2 pb-3">
                                    <i class=" pi pi-comment text-xl mr-3 text-500 align-self-end"></i>
                                    <span class="text-lg font-normal  text-500">Cita individual desde: S/. 60</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-6">
                    <div style="height: 150px" class="border-2 border-dashed surface-border"></div>
                </div>

            </div>

            
            
        </div>

        <div id="slideover-3" class="hidden surface-overlay absolute top-0 right-0 shadow-2 w-full lg:w-6 h-full  z-5">
            <div class="flex flex-column h-full p-4">
                <div class="flex align-items-center justify-content-between mb-4">
                    <span class="text-900 text-xl font-medium">Filtrar</span>
                    <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-plain"
                        v-styleclass="{ selector: '#slideover-3', leaveToClass: 'hidden', leaveActiveClass: 'fadeoutright' }"></Button>
                </div>
                <div class="border-2 border-dashed surface-border flex-auto overflow-y-auto p-3"></div>
            </div>
        </div>
    </div>



</div>


</template>

<style lang="scss" scoped>

.avatar-border{
    border-radius: 50%;
}
.title-item{
    width: 300px;
}

</style>