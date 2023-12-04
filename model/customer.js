const { Model } = require("objection");
const knex = require("../config/db");
const Order = require("./order");

Model.knex(knex);

class Customer extends Model {
  static tableName = "customers";

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        profile_photo: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static relationMappings = {
    owner: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: "customer.id",
        to: "orders.customer_id",
      },
    },
  };
}

module.exports = Customer;
