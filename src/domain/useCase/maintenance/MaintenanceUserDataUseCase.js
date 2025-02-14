import MaintenanceInMemoryRepository from '@/data/repository/maintenance/MaintenanceInMemoryRepository'
export default class MaintenanceUserDataUseCase{
    async getDepartamentos(){ 
        try{
            const response = await  MaintenanceInMemoryRepository.getDepartamentos()
            return response.data
        }catch(error){
            console.error("Error al obtener los departamentos: "+error)
        }
        
    }
    async getProvinciasByDepartamentos(name){ 
        try{
            const response = await  MaintenanceInMemoryRepository.getProvinciasByDepartamentos(name)
            return response.data
        }catch(error){
            console.error("Error al obtener las provincias: "+error)
        }
        
    }
    async getDistritosByProvincias(name){ 
        try{
            const response = await  MaintenanceInMemoryRepository.getDistritosByProvincias(name)
            return response.data
        }catch(error){
            console.error("Error al obtener los distritos: "+error)
        }
        
    }

}