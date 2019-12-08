exports.up = function(knex) {
  return knex.schema.createTable("comment_votes", table => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .notNullable();
    table
      .integer("comment_id")
      .references("id")
      .inTable("comments")
      .notNullable();
    table.index(["user_id", "comment_id"]);
    table.boolean("vote").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comment_votes");
};
