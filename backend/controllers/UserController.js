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
  },
  auth: async (req, res) => {
    try {
      const { username, password } = req.query;
      const user = await knex.select().from("users").where({ "username": username, "password": password})
      user.length ? res.status(200).json(user) : res.status(404).json("username not found");
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = UserController;