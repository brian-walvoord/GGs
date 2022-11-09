const express = require("express");
const knex = require("./db/knex");
const app = express();
require("dotenv").config({ path: "./.env.local"});
const PORT = process.env.PORT || 8080;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());

app.get("/api", (req, res) => {
  try {
    res.status(200).json("👋Hello from the api");
  } catch (err) {
    console.log(err);
  }
});

app.get("/getGames", (req, res) => {
  try {
    fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.API_CLIENT_ID,
        "Authorization": process.env.API_AUTH,
      },
      body: `fields name;where name ~ *"minecraft"*;`
    })
      .then((data) => data.json())
      .then((data) => res.status(200).json(data));
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUsers", async (req, res) => {
  console.log("🤬")
  try {
    const users = await knex.select().from("users");
    res.status(200).send(users)
  } catch (err) {
    console.log(err)
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🎉server listening on port: ${PORT}`);
});
