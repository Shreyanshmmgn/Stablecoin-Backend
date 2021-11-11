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

//* ------------Set Transaction Route ------------
const { setTransaction } = require("./transaction");

router.post("/transaction", setTransaction);

//* ------------Get Transaction Route ------------
const { getTransaction } = require("./getTransaction");

router.get("/getTransaction", getTransaction);

// //* ------------ Testing Route ------------
// require("../Test/db");
module.exports = router;
