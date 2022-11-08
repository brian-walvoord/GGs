const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// const path = require("path");
// app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());

app.get("/api", (req, res) => {
  try {
    res.status(200).json("👋Hello from the api");
  } catch (err) {
    console.log(err);
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`🎉server listening on port: ${PORT}`);
});
