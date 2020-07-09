import {Request , Response} from 'express';
import knex from '../database/connection';

class CharacteristicsController {
    async index(request: Request, response: Response) {
        const characteristics = await knex('characteristics').select('*');
    
        // Separating items 
        const serializedCharacteristics = characteristics.map(characteristics =>{
            return {
                title : characteristics.title,
                image_url : `http://192.168.2.166:3333/uploads/${characteristics.image}`,
                id : characteristics.id
            };
        });
    
        return response.json(serializedCharacteristics);
     }
}

export default CharacteristicsController;