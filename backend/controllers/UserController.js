const express = require("express");
const knex = require("../db/knex");

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await knex.select().from("users");
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
    }
  },
  getFullName: async (req, res) => {
    try {
      let { id } = req.query;
      const fullName = await knex.select().from("users").where({"id": id})
      res.status(200).send(fullName)
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = UserController;