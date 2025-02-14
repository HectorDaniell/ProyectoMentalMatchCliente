<script setup>
import { ref, onMounted, provide } from 'vue';
import CarouselPsicologos from '@/components/information/CarouselPsicologos.vue';
import CardTherapiesUseCase from '@/domain/useCase/initial/CardTherapiesUseCase';
import CardTherapiesDetailUseCase from '@/domain/useCase/initial/CardTherapiesDetailUseCase';

const therapies = ref([])
const therapiesDetail = ref({})
const display = ref(false);
const therapistList = ref([]);
const tags = ref([]);
/* const tags = ['uno','dos','tres','uno','dos','tres'] */

async function listTherapies() {
    try {
        const objTherapiesUseCase = new CardTherapiesUseCase()
        const response = await objTherapiesUseCase.listTherapies()
        therapies.value = response.Data

    } catch (error) {
        console.error('Error al listar las terapias: ', error)
    }
};
provide("valueLanding", therapistList)

async function GetTherapyDetailById(Id) {
    try {
        const objDetail = new CardTherapiesDetailUseCase(Id)
        const response = await objDetail.GetTherapyDetailById(Id)
        therapiesDetail.value = response.Data
        therapistList.value = response.Data.Therapists
        tags.value = objDetail.separarPorComas(therapiesDetail.value.Tags)
    } catch (error) {
        console.error('Error al listar las terapias: ', error)
    }
};
const open = (Id) => {
    display.value = true;
    GetTherapyDetailById(Id)
};
const close = () => {
    display.value = false;
};
onMounted(() => {
    listTherapies()
});

</script>

<template>
    <div v-for="item in therapies" :key="item.TherapyId" 
        class="lg:pr-4 lg:pl-4 lg:pb-4 text-center animation-duration-500 animation-ease-in-out" id="contentCard"  v-animateonscroll="{ enterClass: 'fadeinleft' }" >
        <div>
            <div class="border-round h-full flex flex-column align-items-center gap-3">
                <div class="flex align-items-center justify-content-center">
                    <img class="" :src="'data:image/jpg;base64,' + item.RefImage" id="img_therapy" />
                </div>
                <h4 class="mb-1 text-900">{{ item.Title }}</h4>
                <span class="text-600 px-4 text-justify">{{ item.ShortDescription }}</span>
                <Button class="p-button-m" label="SABER MAS" rounded outlined @click="open(item.TherapyId)" />
            </div>
        </div>
    </div>

    <!-- Seccion dialog tipo de terapia -->
    <Dialog :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }" maximizable modal header="Header" v-model:visible="display" :breakpoints="{ '960px': '100vw' }" :style="{ width: '80vw' }"
        :modal="true" class="generalPopUpTherapyDetail">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2 b-0">
                <h3 class="mt-4 ml-5 font-bold ">{{ therapiesDetail.Title }}</h3>
            </div>
            
        </template>
        
        <div id="typeTherapyPopUp" class="flex gap-5 px-5 pb-5">
            <div>
                <img v-if="therapiesDetail.Image" class="shadow-4" :src="'data:image/jpg;base64,'+ therapiesDetail.Image" id="imgPopUpTherapy"/>
                <Avatar v-else icon="pi pi-user" style="border-radius: 100px;" class="w-10rem h-10rem flex-shrink-0"
                    size="xlarge" shape="circle" />
            </div>
            <div class="flex flex-column justify-content-center gap-5">
                <h3 style="font-style: oblique;">{{ therapiesDetail.Tile }}</h3>
                <p class="line-height-3 text-justify" style="font-size:larger;">{{ therapiesDetail.LongDescription }}</p>
            </div>
        </div>

        <div class="flex flex-column align-items-center mb-3">
            <h4 style="font-style: oblique;">Terapeutas especializados en esta area</h4>
        </div>
        <div class="carouselPsicologos">
            <CarouselPsicologos :valueLanding=therapiesDetail.Therapists></CarouselPsicologos>
        </div>

        <div class="flex flex-column align-items-center">
            <h3 >La terapia de pareja te puede ayudar en:</h3>
        </div>
        <div>
            <div class="flex pb-2 justify-content-center">
                <ul class="flex flex-column list-none gap-2" >
                    <div class="grid align-items-center">
                        <div v-for="(tag, index) in tags" :key="index" class="col-12 md:col-6">
                            <li>
                                <i class="pi pi-check-circle font-bold" style="color:#14b8a6"></i> {{ tag }}
                            </li>
                        </div>
                    </div>

                </ul>
            </div>
            <div id="infoTherapy" class="flex px-8 mx-8 pb-4 text-center">
                <p>
                    De la misma forma, así como se puede trabajar en solucionar problemas ya existentes, la terapia de
                    pareja
                    también es preventiva.
                <p>
                    Esta modalidad puede ayudar a ambos miembros a: Mejorar la comunicación, Aprender
                    a negociar o hacer peticiones de manera asertiva, Superar pequeñas diferenciasMejorar la vida en pareja
                </p>
                </p>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
#carouselCard {
    background-color: rgba(55, 194, 148, 0.173)
}

.border-round.h-full.flex.flex-column.align-items-center.gap-3 img {
    width: 300px;
    height: 200px;
    border-radius: 30px 30px 0px 0px;
}

.flex.gap-5.px-5.pb-5 img {
    width: 450px;
    height: 260px;
    border-radius: 20px;
}

#contentCard {
    background: #f8f8f8e8;
    border: 1px solid #e6e6e6;
    border-radius: 30px;
    width: 300px;
    -webkit-transition: .3s linear;
    -moz-transition: .3s linear;
    -ms-transition: .3s linear;
    -o-transition: .3s linear;
    transition: .3s linear;
}

#contentCard:hover {
    box-shadow: 0 10px 20px rgba(21, 19, 19, .2);

}

.p-button-m:hover {
    background-color: #35b39e !important;
    color: #ffffff !important;
    transform: scale3d(1.04, 1.04, 1.04);
    transition: all 0.5s ease 0s;
}


@media screen and (max-width: 990px) {
    img {
        width: 300px !important;
        height: 180px !important;
        padding-top: 0px;

    }

    #contentCard {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .border-round.h-full.flex.flex-column.align-items-center.gap-3 {
        width: 70vw;
        padding-bottom: 20px;
    }

    #typeTherapyPopUp {
        display: flex;
        flex-direction: column !important;
        padding: 0 !important;
    }
    #imgPopUpTherapy{
        width: 100% !important;
        height: 100% !important;
    }
    #infoTherapy{
        margin: 0px !important;
        padding: 0px !important;
    }

}

@media screen and (max-width: 470px) {
    .carouselPsicologos{
        display: none;
    }
    #contentCard{
        font-size: small;
    }
    .generalPopUpTherapyDetail h3, h4{
        font-size: medium !important;

    }
    


}
</style>