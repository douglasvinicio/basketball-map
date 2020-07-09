import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('characteristics').insert([
        { title: 'Open to public', image: 'open_to_public.png'},
        { title: 'Lighting', image: 'light.png' },
        { title: 'People to play', image: 'people.png' },
        { title: 'Indoor', image: 'indoor.png' },
        { title: 'Outdoor', image: 'outdoor.png' },
        { title: 'Covid-19 Free', image: 'covid-free.png'}
    ]);
}