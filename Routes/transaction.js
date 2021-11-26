const User = require("../Models/userDetails");
const fetch = require("node-fetch");

const addToPortfolio = async (UserId, Transaction) => {
  let currentPortfolioItems = Transaction.items[0]; //This is an object of items
  let portfolioData;
  currentPortfolioItems.quantity = 1;

  let userData = await User.findById(UserId).catch((err) => {
    console.log(err);
  });

  portfolioData = userData.portfolioData;

  await User.findByIdAndUpdate(UserId, {
    $set: {
      portfolioData: [],
    },
  })
    .then((data) => {
      console.log("Deleted data", data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (portfolioData.length != 0) {
    let isExist = false;
    portfolioData.map((item) => {
      if (item.name == currentPortfolioItems.name) {
        item.quantity += 1;
        item.amount += currentPortfolioItems.amount;
        isExist = true;
      }
    });
    console.log("portfolio data - 2 ", portfolioData, "isexsist : ", isExist);

    if (!isExist) {
      console.log("portfolio is not empty but no similarity found");
      portfolioData.push(currentPortfolioItems);
    }
  } else {
    console.log("portfolio is empty no user found");
    portfolioData.push(currentPortfolioItems);
  }
  User.findByIdAndUpdate(
    UserId,
    {
      $push: {
        portfolioData: portfolioData,
      },
    },
    { new: true, useFindAndModify: false }
  ).catch((err) => {
    console.log(err);
  });
};
const createTransaction = function (UserId, Transaction, blockHash) {
  // User.findByIdAndUpdate(
  //   UserId,
  //   {
  //     $push: {
  //       transcationData: {
  //         createdAt: new Date().toString(),
  //         items: Transaction.items,
  //         totalAmount: Transaction.totalAmount,
  //         paidAmount: Transaction.paidAmount,
  //         blockHash: blockHash,
  //         currency: Transaction.currency,
  //         state: Transaction.state,
  //         expires: Transaction.expires,
  //         created: Transaction.created,
  //         wallet: {
  //           _id: Transaction.wallet._id,
  //           address: Transaction.address,
  //           key: Transaction.wallet.key,
  //           created: Transaction.wallet.created,
  //         },
  //         state: Transaction.state,
  //         confirmBlock: Transaction.confirmBlock,
  //         _id: Transaction._id,
  //         _rev: Transaction._rev,
  //         userWalletAddress: Transaction.userWalletAddress,
  //       },
  //     },
  //   },
  //   { new: true, useFindAndModify: false }
  // ).catch((err) => {
  //   console.log(err);
  // });
  addToPortfolio(UserId, Transaction);
};

//*--------------------------------------------------------------------------------------------*

exports.setTransaction = (req, res) => {
  {
    let interval;
    const { userId, invoiceId, blockHash } = req.body;
    let url = "http://3.108.190.137:8000/api/v1/invoice/" + invoiceId;
    console.log("\n>> Set Transaction:\n");
    // addToPortfolio(userId);
    // res.status(200).json({ msg: "true" });
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
