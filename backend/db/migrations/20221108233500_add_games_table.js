/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_games", (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.integer("game_api_id").notNullable();
    table.string("name_of_game").notNullable();
    table.text("description_of_game");
    table.string("cover_of_game");
    table.integer("user_rating");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_games");
};
