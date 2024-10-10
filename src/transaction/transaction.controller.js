const express = require("express");
const router = express.Router();
const transactionService = require("./transaction.service");

// Borrow Item
router.post("/borrow", async (req, res) => {
  try {
    const { userId, itemId, quantityBorrowed } = req.body;

    const newTransaction = await transactionService.borrowItem(
      userId,
      itemId,
      quantityBorrowed
    );

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get Transactions by User ID
router.get("/user", async (req, res) => {
  const { userId } = req.body;

  try {
    const transactions =
      await transactionService.getTransactionsByUserId(userId);

    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get Transactions by ID
router.get("/:id", async (req, res) => {
  const transactionId = req.body;

  try {
    const transactions =
      await transactionService.getTransactionById(transactionId);

    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/verify/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;

    const { status } = req.body;

    await transactionService.verifyTransaction(transactionId, status);

    res.status(200).json({ message: "Transaction verified successfully." });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Return Item

router.patch("/return/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;

    const { userId } = req.body;

    const transaction =
      await transactionService.getTransactionById(transactionId);

    if (transaction.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await transactionService.returnItem(transactionId);

    res.status(200).json({ message: "Item returned" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
