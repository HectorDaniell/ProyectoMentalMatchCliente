import BlogInMemoryRepository from '@/data/repository/blog/BlogInMemoryRepository'
export default class BlogDetailUseCase{
    async getBlogById(id){ //obtiene un blog por id y devuelve el json con la data de determinado blog
        try{
            const response = await  BlogInMemoryRepository.getBlogById(id)
            return response.data
        }catch(error){
            console.error("Error al obtener el contenido del blog seleccionado"+error)
        }   
    }

    async addCommentBlog(userId,blogId,commentReply,avg_Number){ 
        try{
            const objAddComment = {
                UserId:userId,
                BlogId:blogId,
                CommentReply:commentReply,
                Avg_Number:avg_Number
            }
            const response = await  BlogInMemoryRepository.addCommentBlog(objAddComment)
            return (response.data) ?? null
        }catch(error){
            console.error("Error al comentar este blog "+error)
            return null
        }
        
    }
}