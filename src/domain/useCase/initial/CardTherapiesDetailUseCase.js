import TherapyInMemoryRepository from '@/data/repository/initial/TherapyInMemoryRepository'
export default class CardTherapiesDetailUseCase{
    async GetTherapyDetailById(id){
        try{
            const response = await  TherapyInMemoryRepository.GetTherapyDetailById(id)
            return response.data
        }catch(error){
            console.error("Error al obtener el detalle de la terapia seleccionada: "+error)
        }
        
    }
    separarPorComas(listString) { //recibe un atributo string y lo separa por comas y cada elemento lo agrega a una lista y devuelve esta
        // Utilizar el método split para dividir la cadena por comas
        const newList = listString.split(',').map(item => item.trim());
        return newList
    }
}