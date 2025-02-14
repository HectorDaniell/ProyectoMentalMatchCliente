import CentersInMemoryRepository from '@/data/repository/centers/CentersInMemoryRepository'
export default class CentersUseCase{
    async listCenters(){ //lista todos los centros de la base de datos 
        try{
            const response = await  CentersInMemoryRepository.getListCentersSimplified()
            return response.data
        }catch(error){
            console.error("Error al obtener la lista de centros: "+error)
        }
        
    }
}