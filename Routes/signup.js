const User = require("../Models/userDetails");

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    console.log(email);

    if (checkUser) {
      console.log("user cant be registered");
      return res
        .status(422)
        .json({ success: false, msg: " User already exsists! " });
    }
    const user = new User({
      userName,
      email,
      password,
    });
    await user.save();
    console.log("User is saved");
    res
      .status(200)
      .json({ message: "You have been registered please verify your mail" });
  } catch (e) {
    res.status(422).send(e.message);
  }
};
