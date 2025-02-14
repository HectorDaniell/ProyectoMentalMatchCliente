import TherapyInMemoryRepository from '@/data/repository/initial/TherapyInMemoryRepository'
export default class CardTherapiesUseCase{
    async listTherapies(){
        try{
            const response = await  TherapyInMemoryRepository.GetAllTherapies()
            return response.data
        }catch(error){
            console.error("Error al listar las terapias disponibles: "+error)
        }
        
    }
}