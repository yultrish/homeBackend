const { Model } = require('objection');
const knex = require('../config/db')


Model.knex(knex);

class Product extends Model {
    static tableName = 'products';


    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                price: { type: 'integer' },
                stocks: { type: 'integer' },
                description: { type: 'string' },
                image: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }
  

  }

  module.exports = Product;