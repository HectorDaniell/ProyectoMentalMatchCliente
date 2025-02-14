import BlogDataService from '@/data/api/blog/BlogDataService'
class BlogInMemoryRepository {
    //BlogDetail  por su id
    async getBlogById(id) {
        try{
            const response = await BlogDataService.getBlogById(id);
            return response;
        }catch(error){
            console.error('Error al obtener el blog por su id: ', error);
            throw error;
        }
    };

    //List Blog Principal
    async getListBlog() {
        try{
            const response = await BlogDataService.getListBlog();
            return response;
        }catch(error){
            console.error('Error al obtener la lista de blogs: ', error);
            throw error;
        }
    }

    async addCommentBlog(objAddComment){
        try{
            const response = await BlogDataService.addCommentBlog(objAddComment);
            return response;
        }catch(error){
            console.error('Error AddComment: ', error);
            throw error;
        }
    }
}

export default new BlogInMemoryRepository();