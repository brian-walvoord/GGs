const express = require("express");
const knex = require("../db/knex");

const UserController = {
  getFullName: async (req, res) => {
    try {
      let { id } = req.query;
      const fullName = await knex.select().from("users").where({"id": id})
      res.status(200).json(fullName)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  }
};

module.exports = UserController;