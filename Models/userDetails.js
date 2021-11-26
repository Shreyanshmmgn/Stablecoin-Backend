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

  transactionData: [],
  portfolioData: [],
});
// Document

module.exports = mongoose.model("userData", userData);
