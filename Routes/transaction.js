const User = require("../Models/userDetails");
const fetch = require("node-fetch");

const createTransaction = function (UserId, Transaction) {
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
          transaction_id: Transaction._id,
          currency: Transaction.currency,
          state: Transaction.state,
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

exports.setTransaction = (req, res, next) => {
  {
    let interval;
    const { userId, invoiceId } = req.body;
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
            createTransaction(userId, invoiceData);
            console.log("Payment Success");
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
// let data = await res.json();
// console.log(data);
// let user = await User.findOne({
//   email: data.email,
// });
// console.log(user);
// if (user) {
//   let newUser = await User.findOneAndUpdate(
//     { email: data.email },
//     {
//       $push: {
//         transactions: {
//           invoiceId: invoiceId,
//           invoiceData: invoiceData,
//         },
//       },
//     }
//   );
//   console.log(newUser);
//   res.status(200).json({
//     message: "Transaction Successful",
//   });
// } else {
//   res.status(404).json({
//     message: "User not found",
//   });
// }
