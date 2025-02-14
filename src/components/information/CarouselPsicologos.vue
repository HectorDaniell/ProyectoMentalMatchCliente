<script setup>
import { ref, onMounted, inject } from "vue";

const therapistList = ref([])
const getValue = inject("valueLanding",null)
const getValueCenters = inject("valueCenters",null)

if (getValue){
    therapistList.value = getValue
}
else if (getValueCenters){
    therapistList.value = getValueCenters
}

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
        <Carousel :value="therapistList.value" :numVisible="2" :numScroll="3" :responsiveOptions="responsiveOptions" 
            :autoplayInterval="5000">
            <template #item="card">
                <div id="carouselCard" class="surface-border border-round text-center ">
                    <div>
                        <img  v-if=" card.data.User_Image" :src="'data:image/jpg;base64,' + card.data.User_Image" style="border-radius: 10px;" class="w-9rem h-9rem flex-shrink-0 mr-3"  alt="user_comment_image">
                        <Avatar v-else icon="pi pi-user" style="border-radius: 30px;" class="w-9rem h-9rem flex-shrink-0 mr-3" size="xlarge" shape="circle" />
                    </div>
                    <div>
                        <h4 class="mb-1">{{ card.data.FirstName }}</h4>
                        <h6 class="mt-0 mb-3">{{ card.data.LastName }}</h6>
                        <div class="flex flex-column align-items-center gap-3">
                            <!-- <Rating v-model="value" :cancel="false" readonly /> -->
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>


<style scoped>
#carouselCard{
    background-color: rgba(255, 255, 255, 0.173)

}
@media screen and (max-width: 990px) {
    img {
        width: 80px;
    }

    button {
        margin: 0rem;

    }
}
</style>