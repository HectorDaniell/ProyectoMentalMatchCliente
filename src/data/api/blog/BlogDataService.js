import http from '@/http-common';

class BlogDataService {
    getBlogById(id) {
        return http.get("/blog/getById/" + id);
    }
    getListBlog() {
        return http.get("/blog/all-entries");
    }
    addCommentBlog(objAddComment) {
        return http.post("/comentarios/SaveCommentsBlogs",
            [
                {
                    "UserId":objAddComment.UserId,
                    "BlogId":objAddComment.BlogId,
                    "CommentReply":objAddComment.CommentReply,
                    "Avg_Number":objAddComment.Avg_Number
                }
            ],
        )
    }

}

export default new BlogDataService();
