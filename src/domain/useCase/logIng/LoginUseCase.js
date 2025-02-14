import LoginMemoryRepository from '@/data/repository/logIng/LoginMemoryRepository';

export default class LoginUseCase{
    async consultUserSignIn(email,userToken){
        try{
            
            const response = await  LoginMemoryRepository.getUserSignIn(email,userToken)
            if(response?.data?.Success){
                //console.log("LoginUseCase consultUserSignIn:",response.data.Data);
                return response.data.Data
            }else{
                return null
            }

        }catch(error){
            console.error("LoginUseCase consultUserSignIn "+error)
        }
        
    }

    async consultUserToken(token,objUser){
        try{
            //Aqui colocar la funcion para guardar los parametros de informacion del usuario
            const response = await  LoginMemoryRepository.getAuthorization(token,objUser.UserUuid,objUser.Email)
            if(response?.data?.Success && response.data.Data !== null && response.data.Data.trim() !== ''){
                //Aqui guardar token del servidor
                return response.data.Data
            }else{
                return null
            }

        }catch(error){
            console.error("LoginUseCase consultUserSignIn "+error)
            return null
        }
        
    }

    async registerUserPatient(birthDate,sex,name,lastName,tokenFireBase,emailRegister){
        try{

            const año = birthDate.getFullYear().toString();
            const mes = (birthDate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
            const dia = birthDate.getDate().toString().padStart(2, '0');

            const dateWithOutSlash = `${año}${mes}${dia}`;

            const objUser = {
                gender:sex,
                firstName:name,
                lastName:lastName,
                birthDate:dateWithOutSlash,
                tokenFireBase:tokenFireBase,
                email:emailRegister
            }

            const response = await  LoginMemoryRepository.registerUserPatient(objUser)
;
            return (response.data) ?? null

        }catch(error){
            console.error("LoginUseCase registerUserPatient "+error)
            return null
        }
    }

}