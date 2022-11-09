/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { username: "gamer1", first_name: "Franklin", last_name: "Roosevelt" },
    { username: "gamer2", first_name: "Abraham", last_name: "Lincoln" },
    { username: "gamer3", first_name: "Barack", last_name: "Obama" },
    { username: "gamer4", first_name: "George", last_name: "Washington" },
    { username: "gamer5", first_name: "Thomas", last_name: "Jefferson" },
  ]);
};
