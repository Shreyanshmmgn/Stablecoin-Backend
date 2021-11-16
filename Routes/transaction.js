const User = require("../Models/userDetails");
const fetch = require("node-fetch");

const createTransaction = function (UserId, Transaction, blockHash) {
  console.log("\n>> Add Transaction:\n", Transaction, " UserId", UserId);
  User.findByIdAndUpdate(
    UserId,
    {
      $push: {
        transactionData: {
          createdAt: new Date().toString(),
          items: Transaction.items,
          totalAmount: Transaction.totalAmount,
          paidAmount: Transaction.paidAmount,
          blockHash: blockHash,
          currency: Transaction.currency,
          state: Transaction.state,
          expires: Transaction.expires,
          created: Transaction.created,
          wallet: {
            _id: Transaction.wallet._id,
            address: Transaction.wa,
            key: Transaction.wallet.key,
            created: Transaction.wallet.created,
          },
          state: Transaction.state,
          confirmBlock: Transaction.confirmBlock,
          _id: Transaction._id,
          _rev: Transaction._rev,
          userWalletAddress: Transaction.userWalletAddress,
        },
      },
    },
    { new: true, useFindAndModify: false }
  ).catch((err) => {
    console.log(err);
  });
};

//*--------------------------------------------------------------------------------------------*

exports.setTransaction = (req, res) => {
  {
    let interval;
    const { userId, invoiceId, blockHash } = req.body;
    let url = "http://3.108.190.137:8000/api/v1/invoice/" + invoiceId;
    console.log("\n>> Set Transaction:\n");
    //*--------------------------------------------------------------------------------------------*
    const checkStausOfPament = (url) => {
      fetch(url, {
        method: "GET",
      })
        .then(async (data) => {
          let invoiceData = await data.json();
          if (invoiceData.state == "paid") {
            clearInterval(interval);
            createTransaction(userId, invoiceData, blockHash);
            console.log("ment Success");
            res.status(200).json({
              message: "Payment Sucessfull",
              status: "paid",
            });
          }
          return;
        })
        .catch((e) => {
          clearInterval(interval);
          console.log(e);
          res.status(400).json({ message: "Payment Failed" });
        });
    };
    //*--------------------------------------------------------------------------------------------*

    interval = setInterval(() => {
      checkStausOfPament(url);
    }, 5000);

    setTimeout(() => {
      clearInterval(interval);
    }, 600000); // 10 minutes
  }
};

//---------------------------
