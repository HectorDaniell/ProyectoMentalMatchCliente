<script setup>
import { ref, onMounted } from 'vue';
import CentersUseCase from '@/domain/useCase/centers/CentersUseCase';
import { useRouter, useRoute } from 'vue-router';


const layout = ref('list');

const centers = ref([])

async function listCenters() {
    try {
        const objCentersUseCase = new CentersUseCase()
        const response = await objCentersUseCase.listCenters()
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
</script>

<template>
    <div class="grid justify-content-center">
        <div class="col-8">
            <DataView :value="centers" :layout="layout" :paginator="true" :rows="4">
                <template #list="slotProps">
                    <div v-for="(item, index) in slotProps.items" :key="index" v-animateonscroll="{ enterClass: 'fadein' }"
                        class="col-12 animation-duration-500">
                        <div id="centerCard"
                            class=" border-round flex flex-col md:flex-row p-5 w-full justify-content-center gap-5">
                            <div class="flex flex-column justify-content-center align-items-start gap-3 w-full md:w-auto">
                                <img class="centerImage border-round"
                                    :src="item.Center_Image ? 'data:image/jpg;base64,' + item.Center_Image : '/layout/images/ImagesCenters/generic_center.png'"
                                    alt="image">
                                <Button @click="masInfoCenter(item.CenterId)" icon="pi pi-chevron-circle-right"
                                    label="Abrir" rounded></Button>
                            </div>
                            <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center 
                                md:align-items-start md:mt-0">
                                <h3>{{ item.CenterName }} <!-- sdfghkjhgfdsadfghjhgdfhdgfdd --></h3>
                                <p>{{ item.Descripcion }} <!-- Lorem ipsum dolor, sit amet
                                    consectetur adipisicing elit. Ipsum maiores earum, quia velit rerum cum ab! Numquam
                                    obcaecati suscipit asperiores similique, optio, inventore magnam reprehenderit
                                    voluptate, quibusdam voluptates quo itaque? Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Suscipit itaque maxime ducimus incidunt saepe possimus nemo illum,
                                    minima tenetur aliquid, odit consectetur quo vitae voluptatum modi mollitia esse nobis
                                    reprehenderit. --></p>
                                <div>
                                    <Chip :label="' '+item.Address" icon="pi pi-map-marker" class="mr-2 mb-2"></Chip>
                                    <Chip :label="' '+item.Telefono" icon="pi pi-phone" class="mr-2 mb-2"></Chip>
                                </div>
                                <Rating :modelValue="item.ValorationRate" :readonly="true" :cancel="false" class="mb-2">
                                </Rating>
                            </div>
                        </div>
                        <Divider></Divider>
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.p-divider.p-divider-horizontal:before {
    border-top-style: ridge !important;

}

#centerCard img {
    transition: 0.4s;

}

#centerCard {
    -webkit-transition: .3s linear;
    -moz-transition: .3s linear;
    -ms-transition: .3s linear;
    -o-transition: .3s linear;
    transition: .3s linear;
}

#centerCard:hover {
    img {
        transform: scale3d(1.04, 1.04, 1.04);
        transition: all 0.4s ease 0s;
    }
}

.centerImage {
    width: 150px;
    height: 150px;
}

@media screen and (max-width: 975px) {
    .md\:flex-row {
        flex-direction: column !important;
    }

    .md\:flex-column {
        display: flex;
        flex-direction: column !important;
    }

    .flex.flex-column.justify-content-center.align-items-start.gap-3 {
        align-items: center !important;
        ;
    }

}

@media screen and (max-width: 700px) {


    .md\:flex-column {
        display: flex;
        flex-direction: column !important;
    }

    .col-8 {
        width: 100%;
    }

}</style>