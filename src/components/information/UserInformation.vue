<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import GetUserInformationUseCase from '@/domain/useCase/userSettings/GetUserInformationUseCase';
import MaintenanceUserDataUseCase from '@/domain/useCase/maintenance/MaintenanceUserDataUseCase';
const router = useRoute();

/* variables put para actualizar */
const putFirstName = ref()
const putLastName = ref()
const putBirthday = ref()
const putDireccion = ref()
const putDepartamento = ref()
const putProvincia = ref()
const putDistrito = ref()
const putDescripcion = ref()
const putGenero = ref()
const putImg = ref()
const putImgType = ref()


const date = ref();

const genre = ref([
    { genre: 'Masculino', code: 'M' },
    { genre: 'Femenino', code: 'F' }
]);

const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);
    console.log("Evento img: ",event.files[0].type);
    putImgType.value = event.files[0].type
    reader.onloadend = function () {
        const base64data = reader.result;
        putImg.value = base64data.split(',')[1]; // Remove the base64 header
        console.log("Se acrualizo imagen: ");
    };
};


/* VARIABLES PARA ALMACENAR DATOS PARTICULARES DEL USUARIO EXTRAIDOS DEL ARREGLO USER */
const getUserDepartment = ref(null)
const getUserProvince = ref(null)
const getUserDistrict = ref(null)
const getUserGenre = ref(null)

function findElementByString(arr, key, value) {
    return arr.findIndex(obj => obj[key] === value);
}

/* Boton probar datos actualizados */
const showDataUpdate = () =>{
    console.log(
        'putFirstName:',putFirstName.value,
        'putLastName:',putLastName.value,
        'putBirth:',putBirthday.value,
        'putDireccion:',putDireccion.value,
        'putDepartamento:',putDepartamento.value.Departamento,
        'putProvincia:',putProvincia.value.Provincia,
        'putDistrito:',putDistrito.value.Distrito,
        'putDescripcion:',putDescripcion.value,
        'putGenero:',putGenero.value.code,
        'putImg',putImg.value,
        'putImgType', putImgType.value
        )
}

const user = ref({})
async function getUserInformation(userId) {
    try {
        const objUserInfo = new GetUserInformationUseCase(userId)
        const response = await objUserInfo.GetUserInformation(userId)
        user.value = response.Data //Arreglo donde se almacenan los datos del usuario
        putFirstName.value = user.value.FirstName
        putLastName.value = user.value.LastName
        putDireccion.value = user.value.Address
        putDescripcion.value = user.value.Description
        if(user.value.Birthdate){
            const year = user.value.Birthdate.substring(0,4)
            const month = user.value.Birthdate.substring(4,6)-1
            const day = user.value.Birthdate.substring(6,8)
            
            putBirthday.value = new Date(year,month,day)
            
        } 
        putImg.value = user.value.User_Image
        getUserDepartment.value = user.value.Department //variable donde se almacena el departamento del usuario si lo tuviera
        getUserProvince.value = user.value.Province //variable donde se almacena la provincia del usuario si lo tuviera
        getUserDistrict.value = user.value.District //variable donde se almacena el distrito del usuario si lo tuviera
        getUserGenre.value = user.value.Genre //variable donde se almacena el genero del usuario si lo tuviera
        //Validacion si el usuario esta registrado con genero M o F
        if( getUserGenre.value == 'M'){ 
            putGenero.value=genre.value[0]
        }
        else if(getUserGenre.value == 'F'){
            putGenero.value=genre.value[1]
        }
        getDepartamentos() //llamado a lista de departamentos
    } catch (error) {
        console.error('Error al obtener los datos del usuario: ', error)
    }
}



/* DATOS DE DEPARTAMENTOS */
const departamentos = ref([]) //variable donde se guardan los departamentos recuperados de la api
var loadingDep = departamentos ? false : true;

async function getDepartamentos() {
    try {
        const objDepartamentos = new MaintenanceUserDataUseCase()
        const response = await objDepartamentos.getDepartamentos()
        departamentos.value = response.Data

        if (getUserDepartment.value) { //Valida si la variable getUserDepartment es nula, si no lo es...
            const indexDepartamento = findElementByString(departamentos.value, 'Departamento', getUserDepartment.value);//variable index y llamado a la funcion findElementByString con los parametros del contenido de departamento que ya trae de la api
            putDepartamento.value = departamentos.value[indexDepartamento]//le asigno a putDepartamentos el valor string del arreglo de departamentos ubicado por indexDepartamento
            getProvinciasByDepartamentos(putDepartamento.value.Departamento)//llamado a la funcion que lista las provincias en funcion del valor de "Departamento"
        }
        else {//si la variable es null 
            console.log("No se recupero el departamento:", getUserDepartment.value)
        }
    } catch (error) {
        console.error('Error al listar los departamentos: ', error)
    }
}


/* FUNCIONES PARA CAMBIO DE OPCIONES EN FUNCION A UN EVENTO EN LOS DROPDOWN */
const eventDepartmentChange = (selectedValue) => {
    console.log("selectedValue", selectedValue.value)
    getProvinciasByDepartamentos(selectedValue.value.Departamento)
}
const eventProvinceChange = (selectedValue) => {
    console.log("selectedValue", selectedValue.value)
    getDistritosByProvincias(selectedValue.value.Provincia)
}


/* DATOS DE LAS PROVINCIAS */
const provincias = ref([])
async function getProvinciasByDepartamentos(departamento) {
    try {
        const objProvincias = new MaintenanceUserDataUseCase()
        const response = await objProvincias.getProvinciasByDepartamentos(departamento)
        provincias.value = response.Data
        if (getUserProvince.value) { //evaluo si la variable getUserDepartment es nula, si no lo es...
            const indexProvincia = findElementByString(provincias.value, 'Provincia', getUserProvince.value);//creo una variable index y llamo a la funcion findElementByString y le mando los parametros del contenido de departamento que ya trae de la api
            putProvincia.value = provincias.value[indexProvincia]
            getDistritosByProvincias(putProvincia.value.Provincia)//Llamado a la funcion que lista las provincias en funcion del valor que le mande "Departamento"
        }
        else {//si la variable es null 
            console.log("imprime esto si la provincia es null:", getUserProvince.value)
        }
    } catch (error) {
        console.error('Error al listar las Provincias: ', error)
    }
}

/* DATOS DE DISTRITOS */
const distritos = ref([])
async function getDistritosByProvincias(provincia) {
    try {
        const objDistritos = new MaintenanceUserDataUseCase()
        const response = await objDistritos.getDistritosByProvincias(provincia)
        distritos.value = response.Data //asigancion de lista de objetos "Distritos" al arreglo distritos
        if (getUserDistrict.value) { //valida si la variable getUserDistrict es nula, si no lo es...
            const indexDistrito = findElementByString(distritos.value, 'Distrito', getUserDistrict.value);//creo una variable index y llamo a la funcion findElementByString y le mando los parametros del contenido de departamento que ya trae de la api
            putDistrito.value = distritos.value[indexDistrito]//le asigna a putDistrito el valor string del arreglo de distritos ubicado por indexDistrito
        }
        else {//si la variable es null 
            console.log("imprime esto si el distrito es null:", getUserDistrict.value)
        }
    } 
    catch (error) {
        console.error('Error al listar los distritos: ', error)
    }
}


const objUpdateUserUseCase = new GetUserInformationUseCase()
const UpdateDataUser = async(userId,firstNameUser,lastNameUser,addressUser,descriptionUser,birthdateUser,departmentUser,provinceUser,districtUser,sexUser,imgUser,ImgType) =>{
    const checkData = await objUpdateUserUseCase.UpdateUserInformationPost(userId,firstNameUser,lastNameUser,addressUser,descriptionUser,birthdateUser,departmentUser,provinceUser,districtUser,sexUser,imgUser,ImgType)
    if (checkData) {
        alert('se actualizo correctamente')
    }
}

const updateForm = () =>{
    /* Validacion */
    UpdateDataUser(
    userId,
    putFirstName.value, 
    putLastName.value, 
    putDireccion.value, 
    putDescripcion.value, 
    putBirthday.value, 
    putDepartamento.value.Departamento, 
    putProvincia.value.Provincia, 
    putDistrito.value.Distrito,
    putGenero.value.code,
    putImg.value,
    putImgType.value)
}

/* variable momentanea - borrar luego */
var userId = 0
onMounted(() => {
    userId = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')) : 0;
    
    getUserInformation(userId)
    
});
</script>

<template>
    <div class="surface-card p-5 shadow-2 border-round flex-auto xl:ml-5">
        <h3 class="text-900 text-lg mt-3">Informacion de Usuario</h3>
        <Divider></Divider>
        <div class="flex flex-column-reverse md:flex-row">
            <!-- FORM DATOS DE USUARIO -->
            <div class="flex-auto p-fluid">

                <!-- NOMBRES -->
                <div class="mb-4">
                    <label for="fname" class="block font-normal text-900 mb-2">Nombres</label>
                    <InputText id="fname" type="text" v-model="putFirstName" variant="filled" />
                </div>

                <!-- APELLIDOS -->
                <div class="mb-4">
                    <label for="lname" class="block font-normal text-900 mb-2">Apellidos</label>
                    <InputText id="lname" type="text" v-model="putLastName" variant="filled" />
                </div>

                <!-- EMAIL/DISABLED -->
                <div class="mb-4">
                    <label for="email" class="block font-normal text-900 mb-2">Email</label>
                    <InputText id="email" type="text" disabled :placeholder="user.Email" />
                </div>

                <!-- CONTAINER BITH/PAIS -->
                <div class="md:flex gap-4">

                    <!-- BIRTHDAY -->
                    <div class="mb-4">
                        <label for="birth" class="block font-normal text-900 mb-2">Fecha de nacimiento</label>
                        <Calendar v-model="putBirthday" dateFormat="yy/mm/dd" showIcon :manualInput="false"
                            class="w-full md:w-26rem" />
                    </div>

                    <!-- PAIS -->
                    <div class="mb-4">
                        <label for="country" class="block font-normal text-900 mb-2">Pais</label>
                        <InputText id="country" type="text" disabled placeholder="Peru" class="w-full md:w-26rem" />
                    </div>
                </div>

                <!-- DIRECCION -->
                <div class="mb-4">
                    <label for="address" class="block font-normal text-900 mb-2">Direccion</label>
                    <InputText id="address" type="text" v-model="putDireccion" variant="filled" />
                </div>

                <!-- CONTAINER DEP/PROV/DIST -->
                <div class="md:flex gap-4">

                    <!-- DEPARTAMENTO -->
                    <div class="mb-4">
                        <label for="country" class="block font-normal text-900 mb-2">Departamento</label>
                        
                        <Dropdown @change="eventDepartmentChange" v-model="putDepartamento" :options="departamentos" filter
                            optionLabel="Departamento" placeholder="Selecciona tu departamento" class="w-full md:w-14rem" :loading="loadingDep">
                            <!-- Opcion seleccionada -->
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div>{{ slotProps.value.Departamento }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>

                            <!-- Lista de departamentos -->
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.Departamento }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>

                    <!-- PROVINCIA -->
                    <div class="mb-4">
                        <label for="country" class="block font-normal text-900 mb-2">Provincia</label>
                        <Dropdown @change="eventProvinceChange" v-model="putProvincia" :options="provincias" filter optionLabel="Provincia"
                            class="w-full md:w-17rem" />
                    </div>

                    <!-- DISTRITO -->
                    <div class="mb-4">
                        <label for="country" class="block font-normal text-900 mb-2">Distrito</label>
                        <Dropdown v-model="putDistrito" :options="distritos" filter optionLabel="Distrito"
                            class="w-full md:w-17rem" />
                    </div>
                </div>

                <!-- DESCRIPCION -->
                <div class="mb-4">
                    <label for="bio" class="block font-normal text-900 mb-2">Descripcion</label>
                    <Textarea v-model="putDescripcion" id="bio" type="text" rows="5" autoResize></Textarea>
                </div>

                <!-- GENERO -->
                <div class="mb-4">
                    <label for="genre" class="block font-normal text-900 mb-2">Genero</label>
                    <Dropdown  v-model="putGenero" :options="genre" 
                            optionLabel="genre" placeholder="Genero" class="w-full md:w-14rem">
                            <!-- Opcion seleccionada -->
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div>{{ slotProps.value.genre }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>

                            <!-- Lista de departamentos -->
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.genre }}</div>
                                </div>
                            </template>
                        </Dropdown>
                </div>

                <div class="mb-4">
                    <!-- <label for="visibility" class="block font-normal text-900 mb-2">Darse de baja</label> -->
                    <div class="flex align-items-center">
                        <!-- <Checkbox v-model="value1" binary inputId="visibility"></Checkbox> -->
                        <span class="ml-2 font-normal text-base text-color-primary">Suspender este
                            usuario
                            de la plataforma</span>
                    </div>
                </div>
                <div>
                    <Button label="Actualizar" @click="updateForm" class="w-auto mt-3"></Button>
                </div>
            </div>
            <!-- CAMBIAR FOTO DE PERFIL -->
            <div class="flex flex-column align-items-center flex-or ml-2 ">
                <img v-if="putImg" :src="'data:image/jpg;base64,' + putImg" style="border-radius: 100px;"
                    class="w-10rem h-10rem flex-shrink-0 mx-3" alt="user_image">
                <Avatar v-else icon="pi pi-user" style="border-radius: 100px;" class="w-10rem h-10rem flex-shrink-0"
                    size="xlarge" shape="circle" />
                <FileUpload class="p-button-rounded" chooseLabel="Editar" v-model="putImg" chooseIcon="pi pi-pencil" mode="basic"
                    name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader($event)" :auto="true" />
                    
            </div>
        </div>
    </div>
</template>

<style scoped></style>