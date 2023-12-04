const { Model } = require("objection");
const knex = require("../config/db");

Model.knex(knex);

class User extends Model {
  static tableName = "Users";

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        image: { type: "string" },
      },
    };
  }
}

module.exports = User;
