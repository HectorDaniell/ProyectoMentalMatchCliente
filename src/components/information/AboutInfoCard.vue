<script setup>
import { ref, onMounted } from 'vue';
const info = ref([
    {
        title: 'Directorio de psicologos',
        detail: "Encontraras un listado de diferente psicologos con especialidades y tipos de terapia que se acomoden a ti",
        image:"Directorio.webp"
    },
    {
        title: 'El especialista que necesitas',
        detail: "Aplica filtros segun tus preferencias para asi saber que contactas con el spciologo que deseas.",
        image:"aplicaFiltros.webp"
    },
    {
        title: 'Haz Match',
        detail: "Si no conoces tus necesidad Realiza el test y obten una recomendacion",
        image:"MatchMental.webp"
    },
    {
        title: 'Reserva tu cita',
        detail: "Podras reservar citas con los psicologos y con tu cuenta podras comunicarte mejor con el y las tareas que te deje.",
        image:"reservaCita.webp"
    }
])
</script>

<template>
    <div v-for="item in info" :key="item.title" class="col-12 lg:col-3 flex align-items-center justify-content-center" >
        <Card style="border-radius: 26px"  v-ripple v-animateonscroll="{ enterClass: 'fadeinright'}"  class=" p-ripple p-4 flex flex-column align-items-center h-full justify-content-center animation-duration-1000 animation-ease-in-out" id="infoCard">
            <template #header>
                <img alt="image" :src="'/layout/images/ImagesLanding/acercaDe/'+item.image" class="img-card"/>
            </template>
            <template #title> {{ item.title }} </template>
            <!-- <template #subtitle> Card subtitle </template> -->
            <template #content>
                <p class="m-0">
                    {{ item.detail }}
                </p>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.p-4 .img-card{
    width: 155px;
    height: 150px;
    border-radius: 20px;
}
#infoCard{
    -webkit-transition: .3s linear;
    -moz-transition: .3s linear;
    -ms-transition: .3s linear;
    -o-transition: .3s linear;
    transition: .3s linear;
}
#infoCard:hover {
    box-shadow: 1px 1px 15px 10px rgba(21,19,19,.2);
    transition: all 0.4s ease 0s;
}
</style>