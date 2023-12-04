const { Model } = require("objection");
const knex = require("../config/db");
const Customer = require("./customer");
// const Product = require("./product");
const Order = require("./order");
Model.knex(knex);

class Transaction extends Model {
  static tableName = "transactions";

  static get jsonSchema() {
    return {
      type: "object",
      required: ["customer_id"],
      properties: {
        id: { type: "integer" },
        customer_id: { type: "integer" },
        amount: { type: "integer" },
        order_id: { type: "integer" },
        status: { type: "string" },
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
        from: "transactions.customer_id",
        to: "customers.id",
      },
    },
   
  
    orders: {
      relation: Model.HasOneRelation,
      modelClass: Order,
      join: {
        from: "transactions.order_id",
        to: "orders.id",
      },
    },
  };
}

module.exports = Transaction;
