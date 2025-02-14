<script setup>
import { ref, onMounted, provide } from "vue";
import CenterValoration from "@/components/centers/CenterValoration.vue";
import CarouselPsicologos from '@/components/information/CarouselPsicologos.vue';
import CenterDetailUseCase from '@/domain/useCase/centers/CenterDetailUseCase';
import GetUserInformationUseCase from '@/domain/useCase/userSettings/GetUserInformationUseCase';
import { useRouter, useRoute } from 'vue-router';
window.scrollTo({ top: 0 });

const successfullComment = ref (true);
const calificationCenterPut = ref();
const commentReply = ref();
const router = useRoute();
const route = useRouter();
const center = ref({})//objeto donde se almacena la respuesta de la api (un centro obtenido por id)
const listTratamientos = ref([])//lista para almacenar los elementos de tratamientos separados por coma
const listDistritos = ref([])//lista para almacenar los elementos de distritos separados por coma
const therapistCenterList = ref([])
const commentsCenterList = ref([])
const display = ref(false);

provide("valueCenters", therapistCenterList)
provide("comentsCenters", commentsCenterList)



async function getCenterById(centerId) {
    try {
        const objCenterDetailUseCase = new CenterDetailUseCase(centerId) //objeto de useCase para obetener centro por id
        const response = await objCenterDetailUseCase.getCenterById(centerId)//accedo a propiedad getCenterById y almaceno lo que retorna en response
        center.value = response.Data//le asigno lo que retorne en el response al objeto de centers
        therapistCenterList.value = response.Data.Therapists // asigno el valor del arreglo de terapistas por centro al arreglo therapistCenterList
        commentsCenterList.value = response.Data.Comentarios_Centers

        listTratamientos.value = objCenterDetailUseCase.separarPorComas(center.value.TratamientosList)//asigno al arreglo de tratamientos lo que se retorna de la prpiedad separarPorComas a la cual le mando un parametro que es el conetnido del atributo TratamientosList
        listDistritos.value = objCenterDetailUseCase.separarPorComas(center.value.DistrictList)
    } catch (error) {
        console.error('Error al listar los centros: ', error)
    }
}

const user = ref({})
async function getUserInformation(userId) {
    try {
        const objUserInfo = new GetUserInformationUseCase(userId)
        const response = await objUserInfo.GetUserInformation(userId)
        user.value = response.Data
    }
    catch (error) {
        console.error('Error al obtener los datos del usuario: ', error)
    }
}

const tokenJwt = sessionStorage.getItem('tokenWeb');


const loginCustomer = () => {
    route.push('/login');
};

const objAddComment = new CenterDetailUseCase()
const createNewComment = async(userId,centerId,commentReply,avg_Number) =>{
    const checkData = await objAddComment.addCommentCenter(userId,centerId,commentReply,avg_Number)
}

const newCommentForm = () =>{
    if (!commentReply.value || !calificationCenterPut.value) {
            successfullComment.value = false
    }else
    {
        /* Validacion */
        createNewComment(
        userId,
        centerId,
        commentReply.value, 
        calificationCenterPut.value)
        
        
        display.value = false;
        getCenterById(centerId)
    }
}
var userId = 0
const centerId = router.params.id ? router.params.id : 0;
onMounted(() => {
    const centerId = router.params.id ? router.params.id : 0;
    getCenterById(centerId)


    userId = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')) : 0;

})

const open = () => {
    display.value = true;
    getUserInformation(userId)
};

const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};


</script>

<template>
    <section id="imagePortada">
        <div id="home" class="grid pt-8 pb-8 lg:px-8 overflow-hidden "
            style="background-image:linear-gradient(rgba(0,0,0,0.6),rgba(0, 0, 0, 0.5)),url('/layout/images/ImagesCenters/CoverCenter.webp'); background-size:cover; background-attachment: fixed;">
            <!-- Texto de portada -->
            <div class="col-12 md:col-12 p-8 text-start flex align-items-start text-white">
                <section id="textPortada">
                    <div class="flex align-items-center justify-content-center bg-gray-200"
                        style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                        <i class="pi pi-fw pi-star text-2xl text-gray-900"></i>
                    </div>
                    <h1 class="flex text-100 text-6xl font-bold text-start">
                        {{ center.CenterName }}
                    </h1>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 text-white">
                        <i class="pi pi-map-marker text-2xl text-white-900"></i>
                        {{ center.Address }}
                    </p>
                    <div>
                        <Rating v-model="center.ValorationRate" :cancel="false" readonly />
                    </div>
                    <!--                     <div>
                        <Button label="CONTACTAR" type="button"
                            class="p-button p-component p-button-rounded p-button-lm my-6"></Button>
                        <Button @click="smoothScroll('#comentario')" label="DEJA UN COMENTARIO" type="button"
                            class="p-button p-component p-button-rounded p-button-lm my-6 mx-6"></Button>
                    </div> -->
                </section>
            </div>
        </div>
    </section>


    <section id="contenidoCenter">
        <div class="grid container">
            <div class="col-8 pl-8 pt-8 pb-8">
                <div class="grid">
                    <div class="col-12">
                        <div class="infoCard">
                            <span class="font-bold pi pi-info-circle"> Detalle</span>
                            <Divider></Divider>
                            <p>
                                {{ center.Detail }}
                            </p>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="infoCard">
                            <span class="font-bold pi pi-info-circle"> Tratamientos</span>
                            <Divider></Divider>
                            <ul>
                                <li v-for="(tratamiento, index) in listTratamientos" :key="index">{{ tratamiento }}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- Seccion de carrusel -->
                    <section class="col-12">
                        <CarouselPsicologos :valueCenters=therapistCenterList.value></CarouselPsicologos>
                    </section>
                </div>
            </div>


            <div class="col-4 pr-8 pt-8 pb-8">
                <div class="grid">
                    <div class="col-12">
                        <div class="infoCard">
                            <span class="font-bold pi pi-info-circle"> Distritos</span>
                            <Divider></Divider>
                            <ul class="flex flex-wrap gap-2">
                                <li v-for="(distrito, index) in listDistritos" :key="index" class="pi pi-angle-right">{{
                            distrito }}</li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="infoCard">
                            <span class="font-bold pi pi-info-circle"> Contacto</span>
                            <Divider></Divider>
                            <p>
                            <ul class="flex flex-column gap-4">
                                <li class="pi pi-map-marker"> Ubicacion</li>
                                <li class="pi pi-phone"> {{ " " + center.Telefono }}</li>
                                <li class="pi pi-envelope"> {{ " " + center.Email }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="surface-section px-6 py-6 mx-6">
        <div class="opiniones flex">
            <div class="col-6 lg:col-6">
                <div class="font-medium text-xl text-900 mb-3"><i class="pi pi-comments"></i> Comparte tu opinion</div>
                <p class="text-600 p-0 mt-0 mb-3 line-height-3">Dejanos tu opinion acerca del centro
                    visitado</p>
                <Button label="Escribe tu opinion" class="p-button-rounded" @click="open"></Button>
            </div>
            <!-- POP UP FORMULARIO DE COMENTARIOS -->
            <Dialog v-if="tokenJwt" :pt="{root: 'border-none',mask: {style: 'backdrop-filter: blur(2px)',},
    }" maximizable modal header="Header" v-model:visible="display" :breakpoints="{ '960px': '100vw' }"
                :style="{ width: '80vw' }" :modal="true" class="generalPopUpTherapyDetail" :closeOnEscape="true">
                <template #header>
                    <div class="inline-flex align-items-center justify-content-center gap-2 b-0">
                        <h3 class="mt-4 ml-5 font-bold">
                            Deja tu comentario sobre este centro
                        </h3>
                    </div>
                </template>

                <div id="typeTherapyPopUp" class="flex gap-5 px-5 pb-5">
                    <div class="col-12 lg:col-12 flex flex-column align-items-center justify-content-center gap-4 pb-8">
                        <div class="flex flex-column gap-5">

                            <div class="flex align-items-center">
                                <img v-if="user.User_Image" :src="'data:image/jpg;base64,' + user.User_Image"
                                class="w-3rem h-3rem flex-shrink-0 mr-3" style="border-radius: 30px"
                                alt="user_comment_image" />
                                <Avatar v-else icon="pi pi-user" style="border-radius: 30px"
                                class="w-3rem h-3rem flex-shrink-0 mr-3" size="large" shape="circle" />
                                <span class="text-900 font-medium mb-1">{{" " + user.FirstName + " " + user.LastName}}</span>
                            </div>

                            <div class="p-float-label">
                                <Textarea id="message" v-model="commentReply" rows="6" style="width: 40rem" />
                                <label for="message">Escribe tu comentario</label>
                            </div>
                            <div>
                                <Rating v-model="calificationCenterPut" :cancel="false" />
                            </div>
                            <p v-if="successfullComment"></p>
                            <p v-else style="color:darkred; font-weight: bold;">* Por favor, complete todos los campos </p>
                        </div>
                        <Button label="Enviar" @click="newCommentForm" rounded></Button>
                    </div>
                </div>
            </Dialog>

            <Dialog v-else :pt="{root: 'border-none',mask: {style: 'backdrop-filter: blur(2px)',},
    }" v-model:visible="display" :breakpoints="{ '960px': '100vw' }"
                :style="{ width: '80vw' }" :modal="true" class="popUpComment" :closeOnEscape="true"  >

                <div id="typeTherapyPopUp" class="flex gap-5 px-5 pb-5">
                    <div class="col-12 lg:col-12 flex flex-column align-items-center justify-content-center">
                        <div class="flex flex-column">
                            <h2 class="mt-4 ml-5">Inicia sesion para poder comentar </h2>
                            <img src="/public/layout/images/Mobile login-bro.svg"
                                class="h-20rem flex-shrink-0 mr-3"
                                alt="login_image_comment" />
                        </div>
                        <Button @click="loginCustomer()" label="Iniciar Sesion" rounded></Button>
                    </div>
                </div>
            </Dialog>




            <div class="col-6 lg:col-6 flex align-items-center justify-content-center py-5 lg:py-0">
                <div>
                    <span class="text-5xl text-900 font-bold mr-2">{{ center && center.Comentarios_Centers ?
                            center.Comentarios_Centers.length : 0 }}</span>
                    <span class="text-5xl text-600">Opiniones</span>
                    <div class="flex justify-content-around">
                        <Rating v-model="center.ValorationRate" :cancel="false" readonly />
                    </div>
                </div>
            </div>
        </div>
        <CenterValoration :comentsCenters=commentsCenterList.value></CenterValoration>
    </section>
</template>


<style>
.infoCard {
    padding: 2rem;
    border-style: solid;
    border-color: rgb(223, 223, 223);
    border-width: 1px;
    border-radius: 11px;
    text-align: justify;
}


@media screen and (max-width: 700px) {

    /* Responsive*/
    .grid.container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .infoCard {
        padding: 2rem;
    }

    .col-8.pl-8.pt-8.pb-8 {
        padding-left: 3rem !important;
        width: 100vw;
    }

    .col-4.pr-8.pt-8.pb-8 {
        padding-left: 3rem !important;
        padding-right: 3rem !important;
        width: 107vw;
    }

    #typeTherapyPopUp {
        display: flex;
        flex-direction: column !important;
        padding: 1rem !important;

    }

    .p-inputtext {
        box-sizing: content-box !important;
        width: 15rem !important;
    }

    .p-button.p-button-rounded {
        margin: 2rem 3rem 0rem 0rem !important;

    }



    .opiniones {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .opiniones * {
        width: 100%;
    }

}
</style>