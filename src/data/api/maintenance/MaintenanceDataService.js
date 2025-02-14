import http from '@/http-common';

class MaintenanceDataService {
    getDepartamentos(){
        return http.get("/maintenance/getDepartamentos/");
    }
    getProvinciasByDepartamentos(name){
        return http.get("/maintenance/getProvincias/"+name);
    }
    getDistritosByProvincias(name){
        return http.get("/maintenance/getDistritos/"+name);
    }
}
export default new MaintenanceDataService();
