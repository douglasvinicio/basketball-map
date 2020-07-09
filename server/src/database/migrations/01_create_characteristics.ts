import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('characteristics', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        // title would be to items as Open to public, Indoor, Outdoor, Pick Up and Play, Lighting, Number of hoops.
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('characteristics');
}