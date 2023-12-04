const { Model } = require("objection");
const knex = require("../config/db");
const Customer = require("./customer");
const Product = require("./product");
Model.knex(knex);

class Order extends Model {
  static tableName = "orders";

  static get jsonSchema() {
    return {
      type: "object",
      required: ["customer_id"],
      properties: {
        id: { type: "integer" },
        customer_id: { type: "integer" },
        price: { type: "integer" },
        product_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: "orders.customer_id",
        to: "customers.id",
      },
    },

    products: {
      relation: Model.HasOneRelation,
      modelClass: Product,
      join: {
        from: "orders.product_id",
        to: "products.id",
      },
    },
  };
}

module.exports = Order;
