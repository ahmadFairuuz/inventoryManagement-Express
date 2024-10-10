const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sever Working");
});

const authController = require("./auth/auth.controller");
const itemController = require("./item/item.controller");
const userController = require("./user/user.controller");
const transactionController = require("./transaction/transaction.controller");

app.use("/api/auth", authController);
app.use("/api/items", itemController);
app.use("/api/users", userController);
app.use("/api/transaction", transactionController);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
