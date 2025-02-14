import http from '@/http-common';

class CentersDataService {
    getCenterById(id){
        return http.get("/centers/getbyid/"+id);
    }
    getCentersbyName(name){
        return http.get("/centers/getbyname/",{params:{name:name}});
    }
    getListCenters(){
        return http.get("/centers/all");
    }
    getListCentersSimplified(){
        return http.get("/centers/simplifiedAll");
    }
    addCommentCenter(objAddComment) {
        return http.post("/comentariosCenters/SaveCommentsCenters",
            [
                {
                    "UserId":objAddComment.UserId,
                    "CenterId":objAddComment.CenterId,
                    "CommentReply":objAddComment.CommentReply,
                    "Number":objAddComment.Number
                }
            ],
        )
    }
}
export default new CentersDataService();
