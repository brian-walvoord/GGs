/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { username: "gamer1", first_name: "John", last_name: "Smith" },
    { username: "gamer2", first_name: "Jane", last_name: "Smith" },
    { username: "gamer3", first_name: "Barack", last_name: "Obama" },
    { username: "gamer4", first_name: "George", last_name: "Washington" },
    { username: "gamer5", first_name: "Joe", last_name: "Biden" },
  ]);
};
