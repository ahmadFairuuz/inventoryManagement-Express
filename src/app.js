const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const authController = require("./auth/auth.controller");

app.use(express.json());

// process.on("uncaughtException", function (err) {
//   console.log(err);
// });

app.use("/api/auth", authController);

app.get("/", (req, res) => {
  res.send("Hello there!");
});


app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

