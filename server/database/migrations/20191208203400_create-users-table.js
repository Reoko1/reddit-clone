exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.enu("role", ["admin", "moderator"]);
    table.integer("token_version").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
