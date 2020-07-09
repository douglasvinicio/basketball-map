import { Request, Response } from 'express';
import knex from '../database/connection';

class CourtsController {
    async index(request: Request, response: Response) {
        // City, Country {Query Params}
        const {city, country, characteristics } = request.query;

        const parsedCharacteristics = String(characteristics)
        .split(',')
        .map(characteristics => Number(characteristics.trim()));

        const courts = await knex('courts')
        .join('courts_characteristics', 'courts.id', '=' , 'courts_characteristics.court_id')
        .whereIn('courts_characteristics.characteristic_id', parsedCharacteristics)
        .where('city',String(city))
        .where('country', String(country))
        .distinct()
        .select('courts.*');

        return response.json(courts);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const court = await knex('courts').where('id', id).first();

        if (!court){
            return response.status(400).json({ message: 'Court not found.' });
        }

        const characteristics = await knex('characteristics')
        .join('courts_characteristics', 'characteristics.id', '=' , 'courts_characteristics.characteristic_id')
        .where('courts_characteristics.court_id', id)
        .select('characteristics.title');

        return response.json({ court, characteristics});      
    }

    async create(request: Request, response: Response){
        const {
            title,
            address,
            country,
            region,
            city,
            latitude,
            longitude,
            characteristics
        } = request.body;
    
        // Using transaction function to avoid errors when creating items in the database.
        //If the characteristics fail it's not creating the new court.
        const trx = await knex.transaction();
    
        const court = {
            title,
            image : 'https://images.unsplash.com/photo-1559686838-545ca2396ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
            address,
            country,
            region,
            city,
            latitude,
            longitude
        }

        const insertedIds = await trx('courts').insert(court);
    
        const court_id = insertedIds[0];
    
        const courtCharacteristics = characteristics.map((characteristic_id: number) => {
            return {
                characteristic_id,
                court_id
            };
        });
    
        await trx('courts_characteristics').insert(courtCharacteristics);
        // Transaction need commit function to work properly.
        await trx.commit();
    
        return response.json({ 
            id: court_id,
            ...court,
        });
    }
}

export default CourtsController;