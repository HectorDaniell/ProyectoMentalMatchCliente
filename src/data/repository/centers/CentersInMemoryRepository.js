import CentersDataService from '@/data/api/centers/CentersDataService'
class CentersInMemoryRepository {
    //Centers por Id Principal
    async getCenterById(id) {
        try{
            const response = await CentersDataService.getCenterById(id);
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros por su id: ', error);
            throw error;
        }
    };
    //List Centers por nombre
    async getCentersbyName(name) {
        try{
            const response = await CentersDataService.getCentersbyName(name);
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros por su nombre: ', error);
            throw error;
        }
    };
    //List centers
    async getListCenters() {
        try{
            const response = await CentersDataService.getListCenters();
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros: ', error);
            throw error;
        }
    }
    async getListCentersSimplified() {
        try{
            const response = await CentersDataService.getListCentersSimplified();
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros: ', error);
            throw error;
        }
    }
    async addCommentCenter(objAddComment){
        try{
            const response = await CentersDataService.addCommentCenter(objAddComment);
            return response;
        }catch(error){
            console.error('Error AddComment: ', error);
            throw error;
        }
    }
}
export default new CentersInMemoryRepository();