import UserInformationDataService from '@/data/api/userSettings/UserInformationDataService'
class UserInformationInMemoryRepository {
    //UserInformation  por su id
    async GetUserInformation(id) {
        try{
            const response = await UserInformationDataService.GetUserInformation(id);

            return response;
        }catch(error){
            console.error('Error al obtener los datos del usuario: ', error);
            throw error;
        }
    };
    async UpdateUser(objUpdatedUser){
        try{
            const response = await UserInformationDataService.PutUpdateUser(objUpdatedUser);
            return response;
        }catch(error){
            console.error('Error UpdateUserPatient: ', error);
            throw error;
        }
    }
    async PostUpdateUser(objUpdatedUser){
        try{
            const response = await UserInformationDataService.PostUpdateUser(objUpdatedUser);
            return response;
        }catch(error){
            console.error('Error UpdateUserPatient: ', error);
            throw error;
        }
    }
}

export default new UserInformationInMemoryRepository();