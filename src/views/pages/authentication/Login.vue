<script setup>
import { ref,computed } from 'vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from "primevue/usetoast";
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from 'vuex';
import { useRouter,useRoute } from 'vue-router';

import LoginUseCase from '@/domain/useCase/logIng/LoginUseCase';

import Calendar from 'primevue/calendar';


// route
const router = useRouter();
//Store global
const store = useStore();
const setToken = (newToken) => store.commit('setToken',newToken);
const setEmail = (newEmail) => store.commit('setEmail',newEmail);
const setTokenGoogle = (newToken) => store.commit('setTokenGoogle',newToken);

const showSpinner = ref(false);
const email = ref('');
const pass = ref('');
const submitUserLogin = (email, pass) => {
    console.log('Email:', email)
    console.log('Pass:', pass)
}

//Form
const icondisplay = ref(null);
const sexValue = ref(null);
const nameUserForm = ref(null);
const lastNameUserForm = ref(null);

const visibleDialog = ref(false);

const objLoginUseCase = new LoginUseCase();

const toast = useToast();

//Register process

const emailRegister = ref("")

const consultRegister = () =>{
    
    showSpinner.value = true
    
        
    signInWithPopup(auth,googleProvider).then((result)=>{
        //showSpinner.value = false
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
/*         console.log("Register token:",token);
        console.log("Register user:",user); */
        
        //setTokenGoogle(user.accessToken);
        sessionStorage.setItem('tokenFire',user.accessToken);

        //Set Variables
        nameUserForm.value = user.displayName ?? null
        icondisplay.value = null
        sexValue.value = null
        lastNameUserForm.value = null

        //email register
        emailRegister.value = user.email


        visibleDialog.value = true
        showSpinner.value = false     

        
    }).catch((error) =>{
        console.log("Register Fail:",error.message)
        showError(error.message)
        showSpinner.value = false
    })

}



const registerUser = async(birthdateUser,sexUser,nameUser,lastNameUser,tokenFire) =>{
    const checkRegister = await objLoginUseCase.registerUserPatient(birthdateUser,sexUser,nameUser,lastNameUser,tokenFire,emailRegister.value);
    if(checkRegister){
        if(checkRegister.Success ){
            if(checkRegister.Data !== null && checkRegister.Data !== 0){
                //const tokenFire = computed(()=> store.state.tokenGoogle);
                const tokenFire = sessionStorage.getItem('tokenFire');
                consultTokenUser(checkRegister.Data,tokenFire);
            }else{
                visibleDialog.value = false;
                showError(checkRegister.Message??"Error en el registro");
                //setTokenGoogle("");
                sessionStorage.removeItem('tokenFire');
            }
        }else{
            visibleDialog.value = false;
            showError(checkRegister.Message??"Error en el registro");
            //setTokenGoogle("");
            sessionStorage.removeItem('tokenFire');
        }

    }else{
        
        showError("Error en registrar el usuario")
    }
}

const registerForm = () =>{
    if((icondisplay.value && icondisplay.value !== '') && (sexValue.value && sexValue.value !== '') && (nameUserForm.value && nameUserForm.value !== '') && (lastNameUserForm.value && lastNameUserForm.value !== '') ){
        //const tokenFire = computed(()=> store.state.tokenGoogle);
        const tokenFire = sessionStorage.getItem('tokenFire');

        console.log("bithDate",icondisplay.value)
        registerUser(icondisplay.value,sexValue.value,nameUserForm.value,lastNameUserForm.value,tokenFire)
    
    }else{
        showInfo("Es necesario ingresar todo los campos del formulario");        
    }
};


const showError = (message) => {
    toast.add({ severity: 'error', summary: 'Error Conexion', detail: message , life: 3000 });
};
const showInfo = (message) => {
    toast.add({ severity: 'info', summary: 'Registro', detail: message , life: 3000 });
};

const consultTokenUser = async(dataUser,tokenUser) =>{

    //setEmail(dataUser.Email);
    sessionStorage.setItem('emailUser',dataUser.Email);

    const getToken = await objLoginUseCase.consultUserToken(tokenUser,dataUser);


    if(getToken){
        showSpinner.value = false;
        sessionStorage.setItem('tokenWeb',getToken);
        sessionStorage.setItem('userId',dataUser.UserId);        
        //setToken(getToken);
        router.push(`/onlinePsychologists`);     

    }else{
        //setEmail('');
        sessionStorage.clear();
        //setToken('');
        showSpinner.value = false;           
    }

};

const dataUserInformation = async(user) =>{
    //showSpinner.value = true
    const dataUser = await objLoginUseCase.consultUserSignIn(user.email,user.accessToken);

    if(dataUser && dataUser.UserUuid !== null && dataUser.UserUuid.trim() !== ''){
        consultTokenUser(dataUser,user.accessToken);
    }else{
        showError("Sin autorización");
        showSpinner.value = false;
    }
    
};

const googleProvider = new GoogleAuthProvider()
const auth = getAuth()

const loginGoogle = () =>{
    showSpinner.value = true
    signInWithPopup(auth,googleProvider).then((result)=>{
        //showSpinner.value = false
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
/*         console.log("Login token:",token);
        console.log("Login user:",user); */

        dataUserInformation(user)       

        
    }).catch((error) =>{
        console.log("Login Fail:",error.message)
        showError(error.message)
        showSpinner.value = false
    })
}


</script>

    
<template>
    
    <div class="contain">
        <div class="loginImage animation-duration-1000 animation-ease-in-out" v-animateonscroll="{ enterClass: 'fadeinleft'}" >
            <img src="/layout/images/ImagesLanding/Login-amico.png" alt="ico">
        </div>

        <div class="progress-spinner" v-if="showSpinner">
            <ProgressSpinner />
        </div>

        <div class="loginForm">

            <div class="mycard flex justify-content-center p-3 animation-duration-1000 animation-ease-in-out" v-animateonscroll="{ enterClass: 'fadeinright'}">
                <img src="/layout/images/hyper.svg" alt="Image" height="50" class="mb-3">
                
                <h3 class="text-100 text-2x1 mb-2 font-bold size-personalized">BIENVENIDO DE VUELTA!!</h3>
                <div class="text-700 text-2xl mb-6 text-center text-white line-height-3 size-personalized">Inicia sesion para acceder a la
                    plataforma</div>
                
                <span>
                    <Button label="Inicia sesion con Google" class="google size-personalized" icon="pi pi-google" @click="loginGoogle" rounded />
                </span>
                <span class="size-personalized">
                    <p>¿No tienes cuenta? <a @click="consultRegister"><u style="cursor: pointer;">regístrate aquí</u></a></p>
                    
                </span>
            </div>
            
        
        </div>
        
    </div>
    <Toast />
    <Dialog :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }" v-model:visible="visibleDialog" appendTo="body" modal :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '52vw'}" header="Edit Payment Method" :draggable="false" :resizable="false">
        <template #header>
                <div class="flex flex-column gap-2">
                    <h1 class="m-0 text-900 font-semibold text-xl line-height-3">Registro</h1>
                    <span class="text-600 text-base">Complete todos los campos mostrados.</span>
                </div>
        </template>
        <form class="flex flex-column gap-3 mt-3">
            <div>
                <label for="nameuser" class="block mb-1 text-color text-base">Nombre</label>
                <span class="p-input-icon-left w-full">
                    <InputText name="nameuser" type="text" class="w-full" id="nameuser" v-model="nameUserForm" />
                </span>
            </div>
            <div>
                <label for="lastnameuser" class="block mb-1 text-color text-base">Apellidos</label>
                <span class="p-input-icon-left w-full">
                    <InputText name="lastnameuser" type="text" class="w-full" id="lastnameuser" v-model="lastNameUserForm" />
                </span>
            </div>
            
            <div class="flex gap-3">
                <div class="w-full">
                    <label for="birthdate" class="block mb-1 text-color text-base">Fecha de nacimiento</label>
                    <span class="p-input-icon-left w-full">
                        <Calendar v-model="icondisplay" showIcon iconDisplay="input" class="p-input-icon-left w-full" dateFormat="yy/mm/dd" borderRadius="26px" />
                    </span>
                </div>
                <div class="w-full">
                    <label for="expiration" class="block mb-1 text-color text-base">Sexo</label>
                    <div class=" flex justify-content-start">
                        <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                                <RadioButton v-model="sexValue" inputId="female" name="sex" value="F" />
                                <label for="female" class="ml-2">Femenino</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="sexValue" inputId="male" name="sex" value="M" />
                                <label for="male" class="ml-2">Masculino</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <template #footer>
            <div class="flex gap-3 justify-content-end border-top-1 surface-border pt-5">
                <Button label="Cancelar" @click="visibleDialog = false" class="p-button-text"></Button>
                <Button label="Registrar" @click="registerForm" class="p-button-rounded"></Button>
            </div>
        </template>
    </Dialog>
    
    
</template>


<style scoped>
.size-personalized{

    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.google {
    background: linear-gradient(to left, var(--teal-700) 50%, var(--teal-800) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    border-color: var(--teal-500);
    display: flex;
    align-items: stretch;

    &:enabled:hover {
        background: linear-gradient(to left, var(--teal-700) 50%, var(--teal-800) 50%);
        background-size: 200% 100%;
        background-position: left bottom;
        border-color: var(--teal-500);
    }

    &:focus {
        box-shadow: 0 0 0 1px var(--teal-500);
    }
}

a,
p {
    color: #ffffff;
}

Button:hover {
    background-color: #406c5fa5;

}

/* Contenedor de imagen y form */
.contain {
    display: flex;
    align-items: center;
    height: 100vh;
    background-color: #35b39e;
}

.loginForm {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #35b39e;
}

.loginImage {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 48px;
    border-top-right-radius: 150px;
    border-bottom-right-radius: 150px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #ffffff;
    border-radius: 100% 15% 15% 0% / 0% 50% 50% 0%;
}

/* Card de form */
.mycard.flex.justify-content-center {
    display: flex !important;
    flex-direction: column;
    gap: 25px;
    width: 50%;
    align-items: center;
    text-align: center;
}

/* input */


@media only screen and (max-width: 800px) {
    .contain {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        background-color: #ffffff;
        height: 100vh;
        width: 100vw;
        height: 100%;
        width: 100%;
    }

    .loginImage {
        height: 15%;
    }

    .loginForm {
        background-color: #35b39e;
        height: 85%;
        width: 100vw;
    }

}

.progress-spinner {
    position: fixed;
    z-index: 999;
    height: 2em;
    width: 2em;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

/* Transparent Overlay */
.progress-spinner:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.53);
}
</style>    










