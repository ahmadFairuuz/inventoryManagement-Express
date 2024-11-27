const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
//const PORT = process.env.PORT;

dotenv.config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Sever Working");
});


const adminAuthorization = require("./middleware/adminAuthorization");
const authController = require("./auth/auth.controller");
const itemController = require("./item/item.controller");
const userController = require("./user/user.controller");
const transactionController = require("./transaction/transaction.controller");

app.use("/api/auth", authController);
app.use("/api/items", itemController);
app.use("/api/transaction", transactionController);
app.use("/api/users", userController);

// app.listen(PORT, "127.0.0.1", () => {
//   console.log(`Server running on http://127.0.0.1:${PORT}`);
// });

export default app;