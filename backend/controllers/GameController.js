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
      res.status(500).send();
    }
  },

  checkIfAdded: async (req, res) => {
    try {
      let { selection, user } = req.headers;
      let selectionObj = JSON.parse(selection);
      let userObj = JSON.parse(user);
      let result = await knex.select().from("user_games").where({"game_api_id": selectionObj, "user_id": userObj[0].id})
      if (result.length) {
        res.status(200).send(true)
      } else {
        res.status(200).send(false)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send()
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
      res.status(500).send();
    }
  },

  addGame: async (req, res) => {
    try {
      let { user, selection } = await req.headers;
      let selectionObj = await JSON.parse(selection)
      let userObj = await JSON.parse(user)[0]
      await knex('user_games').insert({ 
        user_id: userObj.id,
        game_api_id: selectionObj.id,
        name_of_game: selectionObj.name,
        description_of_game: selectionObj.summary,
        cover_of_game: selectionObj.cover,
        list: "unassigned",
      })
      res.status(200).send("successfully added");
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getLibrary: async (req, res) => {
    try {
      const { id } = req.query;
      let library = await knex.select().from("user_games").where({"user_id": id})
      res.status(200).json(library)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  addRating: async (req, res) => {
    try {
      const { rating } = req.query;
      const { id } = req.headers;
      await knex("user_games").update({"user_rating": rating}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  //####################################################
  addGraphicsRating: async (req, res) => {
    try {
      const { rating } = req.query;
      const { id } = req.headers;
      await knex("user_games").update({"graphics": rating}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  addSoundRating: async (req, res) => {
    try {
      const { rating } = req.query;
      const { id } = req.headers;
      await knex("user_games").update({"sound_and_music": rating}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  addGameplayRating: async (req, res) => {
    try {
      const { rating } = req.query;
      const { id } = req.headers;
      await knex("user_games").update({"gameplay": rating}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  addReplayRating: async (req, res) => {
    try {
      const { rating } = req.query;
      const { id } = req.headers;
      await knex("user_games").update({"replayability": rating}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  addComments: async (req, res) => {
    try {
      const { id, comments } = req.headers;
      await knex("user_games").update({"user_comments": comments}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  addList: async (req, res) => {
    try {
      const { id, list } = req.headers;
      await knex("user_games").update({"list": list}).where({"id": id})
      res.status(200).send();
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  //#####################################################

  getRating: async (req, res) => {
    try {
      const { id } = req.query;
      const rating = await knex.select("user_rating").from("user_games").where({"id": id})
      res.status(200).json(rating)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  //##################################################
  getGraphicsRating: async (req, res) => {
    try {
      const { id } = req.query;
      const rating = await knex.select("graphics").from("user_games").where({"id": id})
      res.status(200).json(rating)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getSoundRating: async (req, res) => {
    try {
      const { id } = req.query;
      const rating = await knex.select("sound_and_music").from("user_games").where({"id": id})
      res.status(200).json(rating)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getGameplayRating: async (req, res) => {
    try {
      const { id } = req.query;
      const rating = await knex.select("gameplay").from("user_games").where({"id": id})
      res.status(200).json(rating)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getReplayRating: async (req, res) => {
    try {
      const { id } = req.query;
      const rating = await knex.select("replayability").from("user_games").where({"id": id})
      res.status(200).json(rating)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getComments: async (req, res) => {
    try {
      const { id } = req.query;
      const comments = await knex.select("user_comments").from("user_games").where({"id": id})
      res.status(200).json(comments)
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },

  getList: async (req, res) => {
    try {
      const { id } = req.query;
      const list = await knex.select("list").from("user_games").where({"id": id})
      res.status(200).json(list);
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  },
  //##################################################

  removeGame: async (req, res) => {
    try {
      const { id } = req.query;
      await knex('user_games').where({"id": id}).del();
      res.status(200).send();
    } catch (err) {
      console.log(err)
      res.status(500).send();
    }
  }
};

module.exports = GameController;