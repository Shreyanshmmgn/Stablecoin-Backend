const mongoose = require("mongoose");

const db = require("../Models/User");

const createUser = function (User) {
  return db.create(User).then((docUser) => {
    // console.log("\n>> Created User:\n", docUser);
    return docUser;
  });
};

const createTransaction = function (UserId, Transaction) {
  // console.log("\n>> Add Transaction:\n", Transaction);
  return db.findByIdAndUpdate(
    UserId,
    {
      $push: {
        Transactions: {
          createdAt: new Date().toString(),
          items: Transaction.items,
          totalAmount: { type: Number, default: 0 },
          paidAmount: { type: Number, default: 0 },
          transaction_id: { type: String },
          currency: { type: String, default: "USDT" },
          state: { type: String },
          walletAddress: { type: String },
        },
      },
    },
    { new: true, useFindAndModify: false }
  );
};

const run = async function () {
  var User = await createUser({
    title: "User #1",
    author: "Shreyansh",
  });

  User = await createTransaction(User._id, {
    items: ["pencil", "pen"],
    url: "/Transactions/mongodb.png",
    caption: "MongoDB Database",
  });

  console.log("\n>> User:\n", User);
};
run();
