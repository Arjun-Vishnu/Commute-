const { OAuth2Client } = require('google-auth-library');
const User = require("../models/login");

const CLIENT_ID = '585016231360-2sjb507mt02vbn844t18q6ukvmi9s34r.apps.googleusercontent.com';
const token = 'token';

const headerExtractor = (req) => {
  let token = null;
  if (req && req.headers.authorization) {
    const authorizationHeader = req.headers.authorization;
    // Check if the Authorization header is in the format "Bearer <token>"
    if (authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.substring(7); // Extract the token
    }
  }
  return token;
};

const verifyIdToken = async (req, res, next) => {
  const token = headerExtractor(req);

  if (!token) {
    // Token is missing
    return res.status(401).json({ message: "Missing token" });
  }

  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    // If request specified a G Suite domain:
    // const domain = payload.hd;

    // Handle the verification result
    console.log('Token verified successfully');
    console.log('User ID:', userId);

    // Find the user in the database
    try {
      const user = await User.findOne({ googleId: userId });
      if (user) {
        req.user = user; // Store the user object in the request for further use
        return next();
      } else {
        return res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      console.error('Error finding user:', error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error('Token verification failed:', error.message);
    // Handle the error, e.g., display an error message or redirect to an error page
    return res.status(401).json({ message: "Invalid token" });
  }
};

verifyIdToken();
