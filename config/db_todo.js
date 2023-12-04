const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex(knexfile.development)

// async function create_todo_table() {
//     const tableExists = await db.schema.hasTable('todo');

//     if (!tableExists) {

//         return db.schema.createTable('todo', (table) => {
//             table.increments('id').primary();
//             table.string('item').notNullable();
//         }).then(() => {
//             console.log('"todo" table created');
//         });
//     }
// }

// create_todo_table();





module.exports = db;