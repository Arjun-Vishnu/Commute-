var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/login');
const jwt = require('jsonwebtoken');
const pass =require('../middleware/passport')


router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful.' });
});
router.post("/signup", (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user)

  user.save()
    .then((signup) => {
      // console.log(signup)
      res.json({ message: 'Signup successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});
router.post('/login', function(req, res) {
  const { username, password } = req.body;
  
  User.findOne({ username: username, password: password })
    .then((user) => {
      // console.log(user)
      if (user) {
        const token = jwt.sign({ username: user.username }, 'pass_key');
        res.json({ "Bearer": token });

      
      } else {
        res.status(401).json({ message: 'Invalid login credentials' });
      }
    })
    .catch((error) => {
      console.log(error); // Check the error in the server logs
      res.status(500).json({ error: 'Internal server error' });
    });
});
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
});
router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    res.send(req.user.profile);
  }
);


module.exports = router;
