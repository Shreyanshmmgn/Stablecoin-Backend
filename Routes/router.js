const express = require("express");
const router = express.Router();

//* ------------ Home Route ------------

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

//* ------------ Signup Route ------------
const { signup } = require("./signup");

router.post("/signup", signup);

//* ------------ Login Route ------------
const { login } = require("./login");

router.post("/login", login);

//* ------------ Transaction Route ------------
const { transaction } = require("./transaction");

router.post("/transaction", transaction);

// //* ------------ Testing Route ------------
// require("../Test/db");
module.exports = router;
