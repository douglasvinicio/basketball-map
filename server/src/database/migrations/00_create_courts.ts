import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('courts', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable(); // Added later. Must delete the previous one and create a new table. 
        table.string('address').notNullable();
        table.string('country').notNullable();
        table.string('region').notNullable();
        table.string('city').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('courts');
}