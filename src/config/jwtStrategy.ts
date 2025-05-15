import passport from 'passport';
import {
  Strategy as JwtStrategy,
  StrategyOptions,
  ExtractJwt,
} from 'passport-jwt';
import { Request } from 'express';

import { User } from '../models';

const combinedExtractor = (req: Request) => {
  return (
    ExtractJwt.fromAuthHeaderAsBearerToken()(req) ||
    (req?.cookies ? req.cookies['jwt'] : null)
  );
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: combinedExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

export const setupJwtStrategy = () => {
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await User.findByPk(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'User not found!' });
        }

        if (user.changedPasswordAfter(jwtPayload.iat)) {
          return done(null, false, {
            message: 'User changed password! please login again.',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
