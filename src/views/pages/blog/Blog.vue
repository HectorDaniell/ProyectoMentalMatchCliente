
<script setup>

import BlogUseCase from '@/domain/useCase/blog/BlogUseCase';
import { ref,onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import Vuex from "vuex";

window.scrollTo({ top: 0 });
/*let store = new Vuex.Store({
  message:"",
  status:""
});*/

const nameService = ref({message:""})
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);

const objBlogUseCase = new BlogUseCase();

const dataviewValue = ref(null);
const router = useRouter();
let items = []

onMounted(async () => {
    dataviewValue.value = await objBlogUseCase.consultListBlog();
});

function getDetail(id){
    router.push(`/blogDetail/${id}`);
}
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="font-bold text-5xl text-900 mb-5 text-center">Blog</div>
            <div class="card">
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    
                    <template #grid="slotProps">
                        
                        <div class="grid nogutter">
                            <div v-for="(item, index) in slotProps.items" :key="index"  v-animateonscroll="{ enterClass: 'fadein' }" class="col-12 lg:col-4 md:col-4  p-3 animation-duration-500">
                                <div class="shadow-2 border-round h-full surface-card" @click="getDetail( item.BlogId )" >
                                    <img src="/layout/images/ImagesLanding/MejoraTuSalud.png" alt="Image" class="block w-full border-round-top" />
                                    <div class="p-4">
                                        <span class="block font-medium text-blue-600 mb-3">Varios</span>
                                        <div class="text-xl text-900 font-medium mb-3 line-height-3">{{ item.Title }}</div>
                                        <div class="line-height-3 mb-3 text-700">{{ item.Description }}</div>
                                        <div class="flex">
                                            <Avatar image="/layout/images/iconos/ic_account.svg" shape="circle" class="max-h-2rem max-w-2rem"></Avatar>
                                            <div class="ml-2">
                                                <div class="text-sm font-bold text-900 mb-1">{{ item.author }}</div>
                                                <div class="text-sm flex align-items-center text-700">
                                                    <i class="pi pi-calendar mr-1 text-sm"></i>
                                                    <span>{{ item.CreateDate }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        
                        
                    </template>

                </DataView>
            </div>
        </div>
    </div>
    
</template>


<style  scoped>
.shadow-2.border-round.h-full.surface-card:hover{
    cursor: pointer;
    outline-color: rgba(49, 138, 172, 0);
    outline-offset: 80px;
    text-shadow: 1px 1px 6px #fff;
    transform:scale3d(1.04,1.04,1.04);
    transition: all 0.5s ease 0s;
}
</style>