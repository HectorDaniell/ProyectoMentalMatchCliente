import http from "../http-common";

class CustomerDataService {
    getListBlog(){
        return http.get("/blog/all-entries");
    }

}

export default new CustomerDataService();