exports.up = function(knex) {
  return knex.schema.createTable("communities", table => {
    table.increments();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("communities");
};
