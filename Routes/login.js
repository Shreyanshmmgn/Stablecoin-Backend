const User = require("../Models/userDetails");

exports.login = (req, res, next) => {
  {
    const email = req.body.email;
    console.log(email);
    User.findOne({ email })
      .then((user) => {
        if (user) {
          console.log("User logged in   : ", user);
          res.status(200).json({
            message: "User is registered",
            user: user,
            success: true,
          });
        } else {
          res.status(200).json({
            message: "User is not registered",
          });
        }
      })
      .catch((err) => next(err));
  }
};
