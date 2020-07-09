import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('courts_characteristics', table => {
        table.increments('id').primary();

        table.integer('characteristic_id')
        .notNullable()
        .references('id')
        .inTable('characteristics');

        table.integer('court_id')
        .notNullable()
        .references('id')
        .inTable('courts');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('courts_characteristics');
}