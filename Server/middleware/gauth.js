const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { OAuth2Client } = require('google-auth-library');
const User = require("../models/login");

const CLIENT_ID = '585016231360-2sjb507mt02vbn844t18q6ukvmi9s34r.apps.googleusercontent.com';

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

const configurePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([headerExtractor]),
    secretOrKey: "secret_key",
  };

  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      User.findOne({ username: jwtPayload.username })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};

const verifyGoogleToken = (req, res, next) => {
  const token = headerExtractor(req);

  if (!token) {
    // Token is missing
    return res.status(401).json({ message: "Missing token" });
  }

  const client = new OAuth2Client(CLIENT_ID);

  client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  })
    .then((ticket) => {
      const payload = ticket.getPayload();
      const userId = payload.sub;
      // If request specified a G Suite domain:
      // const domain = payload.hd;

      // Handle the verification result
      console.log('Token verified successfully');
      console.log('User ID:', userId);

      // Perform further actions based on the verification result
      // e.g., grant access, save user information, redirect to a protected area
      
      // Continue to the next middleware
      next();
    })
    .catch((error) => {
      console.error('Token verification failed:', error.message);
      // Handle the error, e.g., display an error message or redirect to an error page
      res.status(401).json({ message: "Invalid token" });
    });
};

configurePassport();

// Middleware to check token validity
const authenticateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // Token is invalid or expired
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Token is valid
    req.user = user; // Store the user object in the request for further use
    return next();
  })(req, res, next);
};

module.exports = { authenticateToken, verifyGoogleToken };