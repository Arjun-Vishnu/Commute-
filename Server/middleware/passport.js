const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/login");

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

module.exports = authenticateToken;
