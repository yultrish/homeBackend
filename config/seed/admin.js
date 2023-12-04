exports.seed = function (knex) {
  return knex("admin")
    .del()
    .then(function () {
      // insert seed entries
      return knex("admin").insert([
        {
          name: "rash",
          email: "rash@gmail.com",
          password: "admin1234",
        },
      ]);
    });
};
