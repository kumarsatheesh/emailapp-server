//import npm package
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

//import function
import config from "./config";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

//import model
import User from "../models/User";

export const usersAuth = (passport) => {
  passport.use(
    "usersAuth",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      User.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        } else if (user) {
          let data = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          return done(null, data);
        }
        return done(null, false);
      });
    })
  );
};

