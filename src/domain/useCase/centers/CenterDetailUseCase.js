import CentersInMemoryRepository from '@/data/repository/centers/CentersInMemoryRepository'
export default class CenterDetailUseCase{
    async getCenterById(id){ //obtiene un centro por id y devuelve el json con la data de determinado centro
        try{
            const response = await  CentersInMemoryRepository.getCenterById(id)
            return response.data
        }catch(error){
            console.error("Error al obtener los datos del centro seleccionado "+error)
        }
        
    }
    separarPorComas(listString) { //recibe un atributo string y lo separa por comas y cada elemento lo agrega a una lista y devuelve esta
        // Utilizar el método split para dividir la cadena por comas
        const newList = listString.split(',').map(item => item.trim());
        return newList
    }
    async addCommentCenter(userId,centerId,commentReply,avg_Number){ 
        try{
            const objAddComment = {
                UserId:userId,
                CenterId:centerId,
                CommentReply:commentReply,
                Number:avg_Number
            }
            const response = await  CentersInMemoryRepository.addCommentCenter(objAddComment)
            return (response.data) ?? null
        }catch(error){
            console.error("Error al comentar en este centro "+error)
            return null
        }
        
    }
}