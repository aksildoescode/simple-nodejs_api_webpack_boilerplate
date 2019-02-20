import passport from "passport";
import localStrategy from "passport-local";

import User from "../modules/users/user.model";

const localOpts = {
  usernameField: "email"
};

const localStra = new localStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(localStra);

export const authLocal = passport.authenticate("local", { session: false });
