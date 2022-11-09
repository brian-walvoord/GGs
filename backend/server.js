const express = require("express");
const knex = require("./db/knex");
const app = express();
require("dotenv").config({ path: "./.env.local"});
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/UserRoutes");
const gameRoute = require("./routes/GameRoutes");

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());


// Routes
app.use(`/users`, userRoute);
app.use(`/games`, gameRoute);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🎉server listening on port: ${PORT}`);
});
