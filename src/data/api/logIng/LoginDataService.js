import http from '@/http-common';

class LoginDataService {
    getUserSignIn(email,userToken){
        return http.post("/usersignin",{
            "email":email,
            "userToken":userToken
        });
    }
    //Get token
    getAuthorization(token,userUid,userEmail){
        return http.post("/authorization",{
            "token":token,
            "userUid":userUid,
            "userEmail":userEmail

        });
    }
    //SignUp
    setSignUp(objectUser){
        return http.post("/usersignup",{
            "UserId": 0,
            "UserUuid": "",
            "State": true,
            "TypeId": 3,
            "Genre": objectUser.gender,
            "FirstName": objectUser.firstName,
            "LastName": objectUser.lastName,
            "Email": objectUser.email,
            "Birthdate": objectUser.birthDate,
            "UserToken": objectUser.tokenFireBase
        })
    }

}

export default new LoginDataService();