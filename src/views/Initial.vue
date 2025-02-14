<script setup>
import { ref } from "vue";
import TypeTherapyCard from '../components/information/TypeTherapyCard.vue'
import AboutInfoCard from '../components/information/AboutInfoCard.vue'
import CarouselCenters from '../components/information/CarouselCenters.vue'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
window.scrollTo({ top: 0 });


const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const unete = ()=>{
    //router.push('/settings');
    router.push('/onlinePsychologists');
}
</script>

<template>
    <!-- seccion de portada -->
    <section>
        <!-- Texto de portada -->
        <div  id="home" v-animateonscroll="{ enterClass: 'fadein'}" class="grid flex-row pt-8 px-4 lg:px-8 overflow-hidden animation-duration-1000 animation-ease-in-out"
            style="background:linear-gradient(0deg, rgb(255 255 255), rgb(20 184 166 / 72%)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(220 214 214) 0%, rgb(225 225 225) 100%); ">
            <div class="col-12 md:col-7 p-8 text-center flex align-items-center text-black" id="portada">
                <section v-animateonscroll="{ enterClass: 'fadeinleft'}" class="animation-duration-1000 animation-ease-in-out">
                    <h1 class="block text-white text-6xl font-bold mb-4 text-center">Conecta con el psicologo ideal para ti</h1>
                    <p class="font-normal text-1xl line-height-3 mb-5 md:mt-3 text-black">Agenda hoy tu primera cita con un
                        psicólogo en línea de forma fácil, segura y privada.</p>
                    <Button @click="unete()" type="button" v-ripple class="p-ripple p-button p-component p-button-rounded p-button-lm">COMIENZA AQUI</Button>
                    <!-- <Button @click="unete()" label="COMIENZA AQUI" type="button"
                        class="p-button p-component p-button-rounded p-button-lm"></Button> -->
                </section>
            </div>
            <!-- imagen de portada -->
            <div class="col-12 md:col-5 animation-duration-1000 animation-ease-in-out" v-animateonscroll="{ enterClass: 'fadeinright'}">
                <img src="../../public/layout/images/imagesLanding/psic_home.png" alt="Image"
                    class="md:m-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
            </div>
        </div>
    </section>

    <!-- Boton para ir a la zona del test -->
    <div class="flex justify-content-center mt-6">
        <Button @click="smoothScroll('#card-test')" icon="pi pi-arrow-down" severity="secondary" rounded outlined />
    </div>

    <!-- Seccion empezar test -->
    <section  v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" id="card-test" class="card-test animation-duration-1000">
        <div class="col-9 mt-8 mb-8 p-2 md:p-8"
            style="border-radius: 60px; background: linear-gradient(0deg, rgb(239 239 239 / 92%), #35b39e1a), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #00968800 0%, rgb(255 255 255) 100%);">
            <div class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                <h3 class="text-black-900 mb-2">CONTAMOS CON LOS MEJORES ESPECIALISTAS</h3>
                <span class="text-black-600 text-2xl">PARA CADA AREA</span>
                <img src="../../public/layout/images/imagesLanding/psychologist.png" alt="">
                <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style="max-width: 800px">“Conoce
                    que especialista se adapta a ti”</p>
                <Button class="p-button-lg" label="INICIAR TEST" outlined rounded
                    style="border-color: black; color: black;" />
            </div>
        </div>
    </section>
    <!-- Seccion carousel de centros -->
    <section class=" animation-duration-1000 animation-ease-in-out" v-animateonscroll="{ enterClass: 'fadeinleft'}">
        <CarouselCenters></CarouselCenters>
    </section>

    <!-- seccion cartas de tipo de terapia -->

    <section class="typeTherapy "  >
        <div class="col-12 text-center mt-8" >
            <h2 class="text-900 font-bold mb-0">TIPOS DE TERAPIA</h2>
        </div>

        <div id="features" class=" lg:px-8 py-8 mx-0">
            <div class="grid justify-content-center gap-5 " >

                <TypeTherapyCard></TypeTherapyCard>

            </div>
        </div>
    </section>


    <!-- Seccion quienes somos -->
    <!-- <section class="quieneSomos animation-duration-500 animation-ease-in-out" v-animateonscroll="{ enterClass: 'fadeinleft'}"> -->
    <section class="quieneSomos animation-duration-500 animation-ease-in-out">
        <div class="px-4 py-8 md:px-6 lg:px-8">
            <div class="text-white font-bold text-4xl mb-2 text-center"> ¿Que es Mental Match?</div>
            <div class="text-white text-2xl mb-6 text-center line-height-3">Es un directorio donde podras encontrar al profesional que necesitas</div>
            <div class="grid">
                <AboutInfoCard></AboutInfoCard>
            </div>
        </div>
    </section>

    <section class="CardsInformativas">
        <div id="highlights" class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
            <div class="text-center"  v-animateonscroll="{ enterClass: 'fadein'}">
                <h2 class="line-height-1 text-900 text-4xl font-bold">INFORMATE AQUI</h2>
                <span class="text-600 text-2xl">Desliza hacia abajo y descubre los beneficios</span>
            </div>
            
            <div>
                <div class="grid pt-2 md:pt-8">
                    <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:align-items-center animation-duration-1000 animation-ease-in-out"  v-animateonscroll="{ enterClass: 'fadeinleft' }">
                        <h2 class="text-900 font-normal mb-2  ">COMO AGENDO CITA</h2>
                        <ol class="text-700 text-1xl line-height-3 ml-0 md:ml-8 md:mr-8  text-justify">
                            <li>Escoge a tu terapeuta</li>
                            <span>Lleva tu terapia online por videollamada, desde donde estés, a tu propio ritmo.</span>
                            <li>Las personas</li>
                            <span>Psicólogos verificados y especializados listos para acompañarte.</span>
                            <li>La privacidad</li>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a enim nec nisl ullamcorper
                                eleifend.
                                Praesent risus leo, fringilla et ipsum.</span>
                        </ol>
                        <Button  @click="unete()" class="p-button-m" label="UNETE AHORA" rounded />
                    </div>
                    <div v-animateonscroll="{ enterClass: 'fadeinright'}" class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 p-0 animation-duration-1000 animation-ease-in-out"
                        style="border-radius: 0px 50px 50px 0px">
                        <img src="../../public/layout/images/imagesLanding/CitaLanding.png" class="w-12"
                            alt="Como Agendar" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped>
.card-test {
    display: flex;
    justify-content: center;
}
ol li {
    list-style: decimal-leading-zero;
    color: #35b39e;
    font-weight: bold;
}
.quieneSomos{
    background: linear-gradient(2deg, rgb(67 255 146 / 92%), #14b8a6), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #14b8a6 0%, rgb(83 84 84 / 70%) 100%);;
}

@media screen and (max-width: 700px) {
        /* Responsive*/
        #portada{
            padding: 0 !important;
        }
    }

</style>