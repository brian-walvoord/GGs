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
      let { user, selection } = await req.headers;
      console.log(selection)
      let selectionObj = await JSON.parse(selection)
      let userObj = await JSON.parse(user)[0]
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
  },
  getLibrary: async (req, res) => {
    try {
      const { id } = req.query;
      let library = await knex.select().from("user_games").where({"user_id": id})
      res.status(200).json(library)
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = GameController;




// "Season 4 is starting off with a BANG. Shards of a massive comet have crashed into the map altering the landscape. Discover gravity-defying Hop Rocks and find new ways to play. Jump in and witness the aftermath of the impact while you level up your Battle Pass and earn all new loot.

// The Season 4 Battle Pass is here sporting 100 tiers of awesome new rewards, including new cosmetic items, emotes and Sprays.

// Start a movie marathon in Save the World’s latest questline, Blockbuster! Part 1 starts with Five quests and one Landmark Mission. Ray has gone missing and no one knows where she is. With the help of Spitfire and Lok, investigate the comet and gear up to recruit a team of superheroes. Find Ray and bring her back home!"

// "Season 8 has arrived and a monstrous volcano has appeared! Freed from the Ice King’s castle, the now-powerful Prisoner has brought fire and flame to Fortnite and its islands. Pirates, Ninjas and a ship load of new fighters will tussle over treasure, battle with Pirate Cannons and uncover legendary loot. For those daring enough to explore, the new Lazy Lagoon and Sunny Steps locations are just a jump away with the help of Volcanic Vents. There are tons of new areas to explore and secrets to uncover. This season, X marks the spot!"