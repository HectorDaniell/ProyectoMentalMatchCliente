
<script setup>
import { ref, onMounted } from "vue";
import CarouselCentersUseCase from '@/domain/useCase/initial/CarouselCentersUseCase';
import { useRouter, useRoute } from 'vue-router';

const centers = ref([])
async function listCenters() {
    try {
        const objCarouselCentersUseCase = new CarouselCentersUseCase()
        const response = await objCarouselCentersUseCase.listCenters()
        centers.value = response.Data

    } catch (error) {
        console.error('Error al listar los centros: ', error)
    }
}

onMounted(() => {
    listCenters()
})

const router = useRouter();
const masInfoCenter = (id) => {
    router.push({ name: 'centerDetail', params: { id } });
};

const responsiveOptions = ref([
    {
        breakpoint: '1250px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '900px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '500px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>

<template>
    <div class="areaCarousel">
        <Carousel :value="centers" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" circular
            :autoplayInterval="5000">
            <template #item="itemProduct">
                <div class=" m-3 text-start pb-5" style="border-radius: 30px;">
                    <div class="mb-3">
                            <img class="centerImage block w-full border-round-top" :src="itemProduct.data.Center_Image ? 'data:image/jpg;base64,' + itemProduct.data.Center_Image : '/layout/images/ImagesCenters/generic_center.png'" alt="center_image">
                    </div>
                    <div class="px-5">
                        <h4 class="mb-1">{{ itemProduct.data.CenterName }}</h4>
                        <h6 class="mt-0 mb-3">{{ itemProduct.data.Descripcion }}</h6>
                        <Rating v-model="itemProduct.data.ValorationRate" :cancel="false" readonly />
                        <div class="mt-5 flex flex-column align-items-center gap-3">
                            <Button @click="masInfoCenter(itemProduct.data.CenterId)" icon="pi pi-search" label="Ver centro"
                                rounded class="mr-2" />
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>
<style scoped>
.shadow-2.border-round.m-3.text-start.pb-5{
    overflow:hidden;
}
.m-3.text-start.pb-5 {
    -webkit-transition: .3s linear;
    -moz-transition: .3s linear;
    -ms-transition: .3s linear;
    -o-transition: .3s linear;
    transition: .4s linear;
}

.m-3.text-start.pb-5:hover{
    box-shadow: 0px 0px 20px 0px rgba(21,19,19,.2);
}
.centerImage{
    width: 250px !important;
    height: 250px;
}
.mb-3 {
    display: flex;
    justify-content: center;
}
@media screen and (max-width: 450px) {
    .mb-3 {
        display: none;
    }
    .px-5{
        padding-top: 2rem ;

    }
}
</style>