const express = require('express');
const router = express.Router();
const User = require('../models/user');
const City = require('../models/city');

// Create a new city and user
router.get('/createdata', (req, res) => {
  const city = new City({
    name: 'New York',
    population: 8000000,
  });

  city.save()
    .then(savedCity => {
      const user = new User({
        name: 'John Doe',
        age: 25,
        city: savedCity._id,
        fileName: 'profile.jpg',
      });

      return user.save();
    })
    .then(savedUser => {
      res.json({ user: savedUser });
    })
    .catch(error => {
      console.error('Error creating city and user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Example route to perform population using populate()
router.get('/users', (req, res) => {
  User.find()
    .populate('city')
    .exec()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
