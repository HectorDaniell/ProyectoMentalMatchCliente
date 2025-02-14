import CentersInMemoryRepository from '@/data/repository/centers/CentersInMemoryRepository'
export default class CarouselCentersUseCase{
    async listCenters(){
        try{
            const response = await  CentersInMemoryRepository.getListCentersSimplified()
            return response.data
        }catch(error){
            console.error("Error al listar los centros en el carrusel, "+error)
        }
        
    }
}