const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userData = new schema({
  userName: {
    // Name of the user
    type: String,
    required: true,
  },
  email: {
    // Email of the user
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // Email of the user
    type: String,
    required: true,
  },
  date: {
    // Timestamp when the user got registerd
    type: Date,
    default: Date.now,
  },
  // Contains all the details on each transaction
  transactionData: [],
  // Contains all the details on user's portfolio
  portfolioData: [],
});
// Document

module.exports = mongoose.model("userData", userData);
