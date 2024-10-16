import {HydratedDocument} from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import User from '../models/User';
import {UserFields} from '../types';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}

const role = async (req: RequestWithUser, _: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return next();
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return next();
  }

  const user = await User.findOne({token});

  if (!user) {
    return next();
  }

  req.user = user;
  return next();
};

export default role;