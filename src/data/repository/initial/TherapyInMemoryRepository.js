import TherapyDataService from '@/data/api/therapies/TherapyDataService'
class TherapyInMemoryRepository {
    //Therapies por Id Principal
    async GetTherapyDetailById(id) {
        try{
            const response = await TherapyDataService.GetTherapyDetailById(id);
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros por su id: ', error);
            throw error;
        }
    };

    //List therapies
    async GetAllTherapies() {
        try{
            const response = await TherapyDataService.GetAllTherapies();
            return response;
        }catch(error){
            console.error('Error al obtener la lista de centros: ', error);
            throw error;
        }
    }

}
export default new TherapyInMemoryRepository();