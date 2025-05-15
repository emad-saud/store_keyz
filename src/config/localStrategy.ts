import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../models';

export const setupLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              email,
            },
          });

          if (!user) {
            return done(null, false, { message: 'User not found!' });
          }

          if (!(await user.comparePassword(password))) {
            return done(null, false, { message: 'wrong credentials!' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
