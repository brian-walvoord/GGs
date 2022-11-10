const express = require("express");
const knex = require("../db/knex");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GameController = {
  getGames: async (req, res) => {
    try {
      let { search } = req.query;
      fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.API_CLIENT_ID,
          "Authorization": process.env.API_AUTH,
        },
        body: `fields name, cover, summary;search "${search}";where cover != null;limit 50;`
      })
        .then((data) => data.json())
        .then((data) => res.status(200).json(data));
    } catch (err) {
      console.log(err);
    }
  },
  getCover: async (req, res) => {
    try {
      let { id } = req.query;
      fetch("https://api.igdb.com/v4/covers", {
        method: "POST",
        headers: {
          "Client-ID": process.env.API_CLIENT_ID,
          "Authorization": process.env.API_AUTH,
        },
        body: `fields url;where id = ${id};`
      })
        .then(data => data.json())
        .then(data => res.status(200).json(data))
    } catch (err) {
      console.log(err)
    }
  },
  addGame: async (req, res) => {
    try {
      let { selection, user } = await req.headers;
      let selectionObj = await JSON.parse(selection)
      let userObj = await JSON.parse(user)
      console.log(userObj)
      console.log(selectionObj)
      await knex('user_games').insert({ 
        user_id: userObj.id,
        game_api_id: selectionObj.id,
        name_of_game: selectionObj.name,
        description_of_game: selectionObj.summary,
        cover_of_game: selectionObj.cover,
      })
      res.status(200);
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = GameController;