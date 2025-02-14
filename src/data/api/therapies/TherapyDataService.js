import http from '@/http-common';

class TherapyDataService {
/*     SaveTherapies(){
        return http.get("/therapy/getbyid/");
    } */
    GetAllTherapies(){
        return http.get("/therapy/getAll");
    }
    GetTherapyDetailById(id){
        return http.get("/therapy/getAll/"+id);
    }
}
export default new TherapyDataService();
