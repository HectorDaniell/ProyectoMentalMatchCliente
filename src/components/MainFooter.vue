<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const router = useRouter();
const route = useRoute();
const path = ref()
const contactBtn = ()=>{
    router.push('/contactForm');
}

// Otra forma de acceder a la ruta actual

/* const path = ref("");

export default {
    mounted() {
        // Otra forma de acceder a la ruta actual
        path.value = this.$route.path;
        console.log('Otra ruta actual:', path);
    },
};
 */

</script>
<template>
    <footer v-if="path !== '/login'">
        <!-- Curvas superiores del footer -->
        <div class="custom-shape-divider-top-1697263266">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25" class="shape-fill"></path>
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5" class="shape-fill"></path>
                <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    class="shape-fill"></path>
            </svg>
        </div>
        
        s
        <div class="container__footer">

            <div class="box__footer">
                <div class="logo">
                    <img src="/layout/images/iconos/image_logo_white.svg" alt="SVG">
                </div>
                <div class="terms">
                    <p>Descripcion de la pagina de prueba</p>
                </div>
            </div>
            <div class="box__footer">
                <h2>Inicio</h2>
                <a href="#">Realizar el test</a>
                <a href="#">Tipos de terapia</a>
                <a href="#">Sobre la terapia</a>
                <a href="#">Como agendar cita</a>
                <a href="#">Quienes somos</a>

            </div>

            <div class="box__footer">
                <h2>Blog</h2>
                <a href="#">Blogs</a>
            </div>

            <div class="box__footer">
                <h2>Centros </h2>
                <a href="#">Centros</a>
            </div>
<!--             <div class="box__footer">
                <h2>Psicologos Online </h2>
                <a href="#">Consultas</a>
            </div> -->

            <div class="box__footer">
                <h2 >Contacto</h2>
                <a href="#"> <i class="pi pi-facebook"></i> Facebook</a>
                <a href="#"><i class="pi pi-whatsapp"></i> Whatsapp</a>
                <a href="#"><i class="pi pi-telegram"></i> Telegram</a>
                <Divider></Divider>
                <div class="flex flex-column p-2">
                    <Button @click="contactBtn()" label="Contactanos" type="button" class="p-button p-component p-button-rounded p-3 bg-white text-800"></Button>
                </div>
            </div>
        </div>

        <div class="box__copyright">
            <hr>
            <p>Todos los derechos reservados © 2023 <b>MentalMatch</b></p>
        </div>
    </footer>
</template>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #3f3f43;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;

}


/*FOOTER*/

footer {
    width: 100%;
    padding: 0px 0px 50px 0px;
    background: rgb(53, 179, 158);

}

.container__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: auto;
    margin-top: 30px;

}

.box__footer {
    display: flex;
    flex-direction: column;
    padding: 0px 0px 40px 0px;
    text-align: justify;
    align-items: center;
}

.box__footer .logo img {
    width: 180px;
}

.flex.flex-column.p-2 Button:hover{
    background-color: #3f3f43 !important ;
    color: #FFFFFF !important;
    
}

.box__footer .terms {
    max-width: 350px;
    margin-top: 20px;
    font-weight: 500;
    color: #f7f7f7;
    font-size: 18px;
}

.box__footer h2 {
    margin-bottom: 30px;
    color: #ffffff;
    font-weight: 700;
}

.box__footer a {
    margin-top: 10px;
    color: #eaeaea;
    font-weight: 600;
    transition: all 0.3s ease 0s;
}


.box__footer a:hover {
    outline-color: rgba(49, 138, 172, 0);
    outline-offset: 80px;
    text-shadow: 1px 1px 6px #1e1e1e;
    transform:scale3d(1.01,1.01,1.01);
}


.box__copyright {
    max-width: 1200px;
    margin: auto;
    text-align: center;
    padding: 0px 40px;
}

.box__copyright p {
    margin-top: 20px;
    color: #f2f2f2;
}

.box__copyright hr {
    border: none;
    height: 1px;
    background-color: #f4f4f4;
}

@media only screen and (max-width: 800px) {
    .container__footer {
        display: block;

    }
}

/* Parte superior de footer */
.custom-shape-divider-top-1697263266 {

    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-top-1697263266 svg {
    position: relative;
    display: block;
    width: calc(103% + 1.3px);
    height: 74px;
    transform: rotateY(180deg);
}

.custom-shape-divider-top-1697263266 .shape-fill {
    fill: #FFFFFF;
}</style>


