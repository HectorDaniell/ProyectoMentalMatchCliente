import MaintenanceDataService from '@/data/api/maintenance/MaintenanceDataService'
class MaintenanceInMemoryRepository {
    async getDepartamentos() {
        try{
            const response = await MaintenanceDataService.getDepartamentos();
            return response;
        }catch(error){
            console.error('Error al obtener la lista de departamentos: ', error);
            throw error;
        }
    };
    
    async getProvinciasByDepartamentos(name) {
        try{
            const response = await MaintenanceDataService.getProvinciasByDepartamentos(name);
            return response;
        }catch(error){
            console.error('Error al obtener la lista de provincias: ', error);
            throw error;
        }
    };
    
    async getDistritosByProvincias(name) {
        try{
            const response = await MaintenanceDataService.getDistritosByProvincias(name);
            return response;
        }catch(error){
            console.error('Error al obtener la lista de distritos: ', error);
            throw error;
        }
    }
}
export default new MaintenanceInMemoryRepository();