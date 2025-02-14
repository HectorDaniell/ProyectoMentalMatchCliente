import LoginDataService from '@/data/api/logIng/LoginDataService';

class LoginMemoryRepository {

    //Login get UserUuid
    async getUserSignIn(email,userToken) {
        try{
            const response = await LoginDataService.getUserSignIn(email,userToken);
            return response;
        }catch(error){
            console.error('Error getUserSignIn: ', error);
            throw error;
        }
    }
    //Token
    async getAuthorization(token,userUid,userEmail) {
        try{
            const response = await LoginDataService.getAuthorization(token,userUid,userEmail);
            return response;
        }catch(error){
            console.error('Error getAuthorization: ', error);
            throw error;
        }
    }

    async registerUserPatient(objUser){
        try{
            const response = await LoginDataService.setSignUp(objUser);
            return response;
        }catch(error){
            console.error('Error registerUserPatient: ', error);
            throw error;
        }
    }



}

export default new LoginMemoryRepository();