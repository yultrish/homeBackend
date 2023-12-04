// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  development: {
    client: "mysql",
    connection: {
      user: "root",
      password: "",
      port: 3306,
      database: "home",
      host: "127.0.0.1",
    },
    seeds: {
      directory: "./seed",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: process.env.username,
      password: process.env.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
