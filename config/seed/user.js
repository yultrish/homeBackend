exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      // insert seed entries
      return knex("users").insert([
        {
          name: "rash",
          email: "rash@gmail.com",
          password: "admin1234",
        },

        {
          name: "Yulyn",
          email: "yultrish@gmail.com",
          password: "admin1234",
          Image:
            "https://lh3.googleusercontent.com/a/ACg8ocLbEsTe7EKBUjP48X40XPxWn_P38WlInYr90WSJYHSa=s96-c",
        },
      ]);
    });
};
