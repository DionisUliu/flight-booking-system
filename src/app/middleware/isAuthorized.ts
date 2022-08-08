import { NextFunction, Request, Response } from 'express';
import errorDetailsConstants from '../constants/errorDetailsConstants';
import { NotAuthorized } from '../utils/error';

function isAuthorized(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    throw new NotAuthorized(errorDetailsConstants.NOT_AUTHORIZED);
  }
  next();
}

export default isAuthorized;
