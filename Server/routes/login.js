var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/login");
const jwt = require("jsonwebtoken");
const authentcate = require("../middleware/passport");
const tokenVerify =require("../middleware/gauth")

router.post("/logout",authentcate ,(req, res) => {
  // res.clearCookie("jwt");
  res.json({ message: "Logout successful." });
});

router.post("/signup", (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);

  user
    .save()
    .then((signup) => {
      // console.log(signup)
      res.json({ message: "Signup successful" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});
router.post("/login", function (req, res) {
  const { username, password } = req.body;

  User.findOne({ username: username, password: password })
    .then((user) => {
      // console.log(user)
      if (user) {
        const token = jwt.sign({ username: user.username }, "secret_key");
        // res.cookie("jwt", token, { httpOnly: true });
        res.json({ Bearer: token });
      } else {
        res.status(401).json({ message: "Invalid login credentials" });
      }
    })
    .catch((error) => {
      console.log(error); 
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/profile", authentcate, (req, res) => {
      res.json({ usernme: req.user.username });

});

module.exports = router;
