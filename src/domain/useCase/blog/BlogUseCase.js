import BlogInMemoryRepository from '@/data/repository/blog/BlogInMemoryRepository'
export default class BlogUseCase{
    async consultListBlog(){
        try{
            
            const response = await  BlogInMemoryRepository.getListBlog()
            if(response?.data?.Success){
                return response.data.Data
            }else{
                return null
            }

        }catch(error){
            console.error("BlogUseCase consultListBlog "+error)
        }
        
    }
}