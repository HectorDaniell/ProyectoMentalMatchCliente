import http from '@/http-common';

class UserInformationDataService {

    GetUserInformation(id) {
        http.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('tokenWeb')}`;
        return http.get("/userinformation/byUserId/" + id);
    }

    PutUpdateUser(objUpdatedUser) {
        return http.put("/userinformation/updateUser",
            [
                {
                    "UserId": objUpdatedUser.UserId,
                    "FirstName": objUpdatedUser.FirstName,
                    "LastName": objUpdatedUser.LastName,
                    "Genre": objUpdatedUser.Genre,
                    "Birthdate": objUpdatedUser.BirthDate,
                    "Address": objUpdatedUser.Address,
                    "District": objUpdatedUser.District,
                    "Description": objUpdatedUser.Description,
                    "User_Image": objUpdatedUser.User_Image,
                    "Usr_Image_Type": objUpdatedUser.Usr_Image_Type,
                    "Province": objUpdatedUser.Province,
                    "Department": objUpdatedUser.Department
                }
            ],
        )
    }

    PostUpdateUser(objUpdatedUser) {
        return http.post("/userinformation/updateUserPost",
            [
                {
                    "UserId": objUpdatedUser.UserId,
                    "FirstName": objUpdatedUser.FirstName,
                    "LastName": objUpdatedUser.LastName,
                    "Genre": objUpdatedUser.Genre,
                    "Birthdate": objUpdatedUser.BirthDate,
                    "Address": objUpdatedUser.Address,
                    "District": objUpdatedUser.District,
                    "Description": objUpdatedUser.Description,
                    "User_Image": objUpdatedUser.User_Image,
                    "Usr_Image_Type": objUpdatedUser.Usr_Image_Type,
                    "Province": objUpdatedUser.Province,
                    "Department": objUpdatedUser.Department
                }
            ],
        )
    }
}
export default new UserInformationDataService();
