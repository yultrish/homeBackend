/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('price').notNullable();
    table.string('description').notNullable();
    table.integer('stocks').notNullable();
    table.string('image').notNullable(); //path
    table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products')
  
};