const User = require("../Models/userDetails");

exports.getPortfolioData = (req, res, next) => {
  const userId = req.body.userId;

  User.findOne({ _id: userId })
    .then((user) => {
      const portfolioData = user.portfolioData;
      if (user.portfolioData.length !== 0) {
        res.status(200).json({
          message: "Transaction fetched successfully!!",
          data: portfolioData,
          success: true,
        });
      } else {
        res
          .status(200)
          .json({ message: "No transaction data found", success: false });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: "some error occur", success: false });
    });
};
