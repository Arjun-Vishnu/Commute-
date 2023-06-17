const express = require('express');
var router = express.Router();
const axios = require('axios');
const app = express();

router.post('/google-login', async (req, res) => {
  const { credential } = req.body;

  // Make a POST request to Google's token validation endpoint to verify the credential
  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/tokeninfo', {
      id_token: credential.token,
    });

    // Access the verified user information from the response
    const { sub, email, name } = data;

    // Perform any additional authentication or authorization logic here

    // Example response with user information
    res.status(200).json({ userId: sub, email, name });
  } catch (error) {
    console.error('Error during Google token validation:', error.message);
    res.status(400).json({ message: 'Invalid credential' });
  }
});
module.exports = router;
