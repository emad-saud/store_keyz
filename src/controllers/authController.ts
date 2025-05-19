import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import { UserInstace, User } from '../models';
import passport from '../config/passport';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { createOne } from './factoryHandler';
import Role from '../enums/roles';

export const protect: RequestHandler = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: UserInstace, info: any) => {
      if (err || !user) {
        return next(
          new AppError('Unauthorized. Please login to gain access!', 401)
        );
      }

      req.user = user;
      res.locals.user = user;

      next();
    }
  )(req, res, next);
};

export const authPassword: RequestHandler = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: UserInstace, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new AppError('User not Found!', 404));
      }

      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      res.status(200).json({
        status: 'success',
        token,
      });
    }
  )(req, res, next);
};

export const signUp: RequestHandler = createOne(User, [
  'email',
  'username',
  'password',
  'passwordConfirm',
]);

export const restrictTo = (roles: Role[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('User not authenticated', 403));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You don't have permission to perform this action!`, 403)
      );
    }

    next();
  };
};

export const isLoggedIn: RequestHandler = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      if (typeof decoded !== 'object' || !('id' in decoded)) {
        return next();
      }

      const user = await User.findByPk(decoded.id);
      if (!user || user.changedPasswordAfter(decoded.iat!)) return next();
      res.locals.user = user;
    } catch (err) {
      return next()
    }
  }
};
