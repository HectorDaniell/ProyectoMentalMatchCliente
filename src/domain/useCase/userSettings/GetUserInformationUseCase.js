import UserInformationInMemoryRepository from '@/data/repository/userSettings/UserInformationInMemoryRepository'
export default class GetUserInformationUseCase{
    async GetUserInformation(id){ //obtiene los datos de un usuario por id y devuelve el json con la data de determinado usuario
        try{
            const response = await  UserInformationInMemoryRepository.GetUserInformation(id)

            return response.data
        }catch(error){
            console.error("Error al obtener los datos del usuario: "+error)
        }
        
    }
    async UpdateUserInformation(userId,name,lastName,address,description,birthdate,department,province,district,sex,img,Usr_Image_Type){ //obtiene los datos de un usuario por id y devuelve el json con la data de determinado usuario
        try{

            const año = birthdate.getFullYear().toString();
            const mes = (birthdate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
            const dia = birthdate.getDate().toString().padStart(2, '0');

            const dateWithOutSlash = `${año}${mes}${dia}`;

            const objUpdatedUser = {
                UserId:userId,
                FirstName:name,
                LastName:lastName,
                Genre:sex,
                BirthDate:dateWithOutSlash,
                Address:address,
                District:district,
                Description:description,
                User_Image:img,
                Usr_Image_Type:Usr_Image_Type,
                Province:province,
                Department:department
            }
            const response = await  UserInformationInMemoryRepository.UpdateUser(objUpdatedUser)

           /*  console.log("LoginUseCase consultUserToken:",response.data); */
            return (response.data) ?? null
        }catch(error){
            console.error("Error al actualizar los datos del usuario "+error)
            return null
        }
        
    }






    async UpdateUserInformationPost(userId,name,lastName,address,description,birthdate,department,province,district,sex,img,Usr_Image_Type){ //obtiene los datos de un usuario por id y devuelve el json con la data de determinado usuario
        try{

            const año = birthdate.getFullYear().toString();
            const mes = (birthdate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
            const dia = birthdate.getDate().toString().padStart(2, '0');

            const dateWithOutSlash = `${año}${mes}${dia}`;

            const objUpdatedUser = {
                UserId:userId,
                FirstName:name,
                LastName:lastName,
                Genre:sex,
                BirthDate:dateWithOutSlash,
                Address:address,
                District:district,
                Description:description,
                User_Image:img,
                Usr_Image_Type:Usr_Image_Type,
                Province:province,
                Department:department
            }
            /* console.log("UpdateUserUseCase json final: objUser",objUpdatedUser) */
            const response = await  UserInformationInMemoryRepository.PostUpdateUser(objUpdatedUser)

           /*  console.log("LoginUseCase consultUserToken:",response.data); */
            return (response.data) ?? null
        }catch(error){
            console.error("Error al actualizar los datos del usuario "+error)
            return null
        }
        
    }

}