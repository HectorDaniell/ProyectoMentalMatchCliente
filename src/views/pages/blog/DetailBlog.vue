<script setup>
//console.log("DetailBlog ",this.$route.params.id)
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BlogDetailUseCase from '@/domain/useCase/blog/BlogDetailUseCase';
import GetUserInformationUseCase from '@/domain/useCase/userSettings/GetUserInformationUseCase';

window.scrollTo({ top: 0 });
const router = useRoute();
const route = useRouter();
const successfullComment = ref (true);
const commentReply = ref();
const display = ref(false);
const calificationBlogPut = ref();
const blog = ref({})//objeto donde se almacena la respuesta de la api (un blog obtenido por id)
const commentsBlogList = ref([])
async function getBlogById(blogId) {
    try {
        const objBlogDetailUseCase = new BlogDetailUseCase(blogId) //objeto de useCase para obetener centro por id
        const response = await objBlogDetailUseCase.getBlogById(blogId)//accedo a propiedad getBlogById y almaceno lo que retorna en response
        blog.value = response.Data//le asigno lo que retorne en el response al objeto de blogs
        commentsBlogList.value = response.Data.comentarios

    } catch (error) {
        console.error('Error al listar los datos del blog: ', error)
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

const objAddComment = new BlogDetailUseCase()
const createNewComment = async(userId,blogId,commentReply,avg_Number) =>{
    const checkData = await objAddComment.addCommentBlog(userId,blogId,commentReply,avg_Number)
}

const newCommentForm = () =>{
    if (!commentReply.value || !calificationBlogPut.value) {
            successfullComment.value = false
        }
        else{
             /* Validacion */
            createNewComment(
            userId,
            blogId,
            commentReply.value, 
            calificationBlogPut.value)

            display.value = false;
            getBlogById(blogId)
        }
}

const loginCustomer = () => {
    route.push('/login');
};

const tokenJwt = sessionStorage.getItem('tokenWeb');


var userId = 0
const blogId = router.params.id ? router.params.id : 0; //recupera el id del blog actual

onMounted(() => {
        const blogId = router.params.id ? router.params.id : 0;
        getBlogById(blogId)

        userId = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')) : 0;
        
    });


    const open = () => {
        display.value = true;
        getUserInformation(userId)
    };


</script>

<template>
    <div class="surface-section px-4 md:px-6 lg:px-8" v-animateonscroll="{ enterClass: 'zoomin' }">
        <div class="py-4 text-center md:text-left border-round bg-cover h-20rem lg:h-30rem flex flex-column justify-content-end mb-5"
            style="background: url('/layout/images/ImagesLanding/MejoraTuSalud.png')">
            <div class="grid">
                <div class="col lg:col-offset-2 px-5">
                    <div class="text-5xl font-bold text-white">{{ blog.Title }}</div>
                    <div class="mt-2">
                        <Rating v-model="blog.ValorationRate" :cancel="false" readonly />
                    </div>
                    <p class="line-height-3 text-white text-lg text-center md:text-left mt-3">
                        Publicado el {{ blog.UpdateDate }} por {{ blog.author }}
                    </p>
                </div>
            </div>
        </div>
        <div class="grid">
            <!-- flex flex-column-reverse -->
            <div class="col-12 lg:col-3 surface-border">
                <div class="p-3">
                    <div class="flex flex-wrap align-items-center justify-content-between mb-5 gap-5">
                        <div class="flex flex-row">
                            <span
                                class="text-900 surface-100 inline-flex font-semibold py-2 px-3 mr-2 border-round">Varios</span>
                            <span
                                class="text-900 surface-100 inline-flex font-semibold py-2 px-3 mr-2 border-round">Pareja</span>
                            <span
                                class="text-900 surface-100 inline-flex font-semibold py-2 px-3 border-round">Maltrato</span>
                        </div>
                    </div>
                    <span class="text-900 font-medium text-xl block mb-5">Author</span>
                    <div class="flex border-bottom-1 surface-border pb-4 mb-5">
                        <img src="/layout/images/iconos/ic_account.svg" class="mr-3 h-5rem w-5rem" />
                        <div class="flex flex-column align-items-start">
                            <span class="text-lg text-900 font-medium mb-1">{{blog.author}}</span>
                            <br />
                            <div class="flex align-items-center gap-4">
                                <i class="pi pi-twitter cursor-pointer"></i>
                                <i class="pi pi-facebook cursor-pointer"></i>
                                <i class="pi pi-link cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col lg:px-5">
                <div v-html="blog.Content" class="line-height-3 text-lg text-900 mb-4"></div>
                <div
                    class="flex flex-wrap justify-content-between align-items-center gap-3 bg-primary text-primary-700 p-3 border-round">
                    <span class="font-medium text-2xl">Content Section Title</span>
                    <div class="flex align-items-center cursor-pointer">
                        <span class="font-bold mr-3">View Post Statistics</span>
                        <i class="pi pi-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="surface-section px-6 py-6 mx-6">
        <div class="comentarios flex">
            <div class="col-6 lg:col-6">
                <div class="font-medium text-xl text-900 mb-3">
                    <i class="pi pi-comments"></i> Comparte tu opinion
                </div>
                <p class="text-600 p-0 mt-0 mb-3 line-height-3">
                    Dejanos tu opinion acerca del blog visualizado
                </p>
                <Button label="Escribe tu opinion" class="p-button-rounded" @click="open"></Button>
            </div>
            <!-- POP UP FORMULARIO DE COMENTARIOS -->
            <Dialog v-if="tokenJwt" :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)',
        },
    }" maximizable modal header="Header" v-model:visible="display" :breakpoints="{ '960px': '100vw' }"
                :style="{ width: '80vw' }" :modal="true" class="generalPopUpTherapyDetail" :closeOnEscape="true">
                <template #header>
                    <div class="inline-flex align-items-center justify-content-center gap-2 b-0">
                        <h3 class="mt-4 ml-5 font-bold">
                            Deja tu comentario sobre este blog
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
                                <Textarea class="messageComment" v-model="commentReply" id="message" rows="6"/>
                                <label for="message">Escribe tu comentario</label>
                                
                            </div>
                            <div>
                                <Rating v-model="calificationBlogPut" :cancel="false" />
                            </div>
                            <p v-if="successfullComment"></p>
                            <p v-else style="color:darkred; font-weight: bold;">*Por favor, complete todos los campos </p>
                        </div>
                        <Button label="Enviar" @click="newCommentForm" rounded></Button>
                    </div>
                </div>
            </Dialog>

            <Dialog v-else :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)',
        },
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

            <div class="col-6 lg:col-6 flex justify-content-center">
                <div>
                    <span class="text-5xl text-900 font-bold mr-2">
                        {{ blog && blog.comentarios ? blog.comentarios.length : 0 }}</span>
                    <span class="text-5xl text-600">Opiniones</span>
                    <div class="flex justify-content-around">
                        <Rating v-model="blog.ValorationRate" :cancel="false" readonly />
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <ul class="list-none m-0 p-0">
                <li class="py-5 border-top-1 surface-border" v-for="(comment, index) in commentsBlogList" :key="index">
                    <div class="calification flex align-items-start justify-content-between mb-3">
                        <div class="flex align-items-center">
                            <img v-if="comment.User_Image" :src="'data:image/jpg;base64,' + comment.User_Image"
                                class="w-3rem h-3rem flex-shrink-0 mr-3" style="border-radius: 30px"
                                alt="user_comment_image" />
                            <Avatar v-else icon="pi pi-user" style="border-radius: 30px"
                                class="w-3rem h-3rem flex-shrink-0 mr-3" size="large" shape="circle" />
                            <div class="flex flex-column">
                                <span class="text-900 font-medium mb-1">{{
        " " + comment.FirstName + " " + comment.LastName
    }}</span>
                                <span class="text-500 font-medium text-sm">{{
            comment.UpdateDate
                                    }}</span>
                            </div>
                        </div>
                        <div class="flex align-items-center">
                            <span class="mr-2">
                                <Rating v-model="comment.Avg_Number" :cancel="false" readonly />
                            </span>
                            <span class="font-medium">{{ comment.Avg_Number }}</span>
                        </div>
                    </div>
                    <p class="text-600 p-0 m-0 line-height-3">
                        {{ comment.CommentReply }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.messageComment{
    width: 35rem;
}
@media screen and (max-width: 700px) {

    /* Responsive*/
    .comentarios {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .comentarios * {
        width: 100%;
    }

    .messageComment{
        width: 20rem;
    }
    .mt-5 {
        display: flex;
        flex-direction: column;
    }

    .calification {
        display: flex;
        flex-direction: column;
    }
}
</style>
