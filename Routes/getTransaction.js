const User = require("../Models/userDetails");

exports.getTransaction = (req, res, next) => {
  const userId = req.body.userId;

  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        const transactionData = user.transactionData;
        if (user.transactionData.length !== 0) {
          res.status(200).json({
            message: "Transaction fetched successfully!!",
            transactionData,
            success: true,
          });
        } else {
          res
            .status(200)
            .json({ message: "No transaction data found", success: false });
        }
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: "some error occur", success: false });
    });
};
// const
//  const userId = req.params.userId;
//  User.findOne({ _id: userId })
//    .then((user) => {
//      if (user) {
//        res.status(200).json({
//          message: "Transaction fetched successfully!",
//          user: user,
//        });
//      } else {
//        res.status(404).json({ message: "User not found!" });
//      }
//    })
//    .catch((err) => {
//      res.status(500).json({
//        message: "Fetching transaction failed!",
//      });
//    });
