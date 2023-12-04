const { Model } = require("objection");
const knex = require("../config/db");

Model.knex(knex);

class Admin extends Model {
  static tableName = "admin";

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}

module.exports = Admin;
