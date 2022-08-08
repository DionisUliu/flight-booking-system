import Util from 'util';
import { Response, Request, NextFunction } from 'express';
// import { getLogger } from '../config/logger';
import { GeneralError, InternalError } from '../utils/error';

/**
 * Express error handling middleware
 */

export default (
  err: any,
  req?: Request,
  res?: Response,
  next?: NextFunction
) => {
  let fullPath = null;
  let error = err;

  if (req?.originalUrl && req?.method) {
    fullPath = `${req.method} ${req.originalUrl}`;
  }

  if (!(err instanceof GeneralError)) {
    error = new InternalError(
      typeof err === 'object' ? Util.inspect(err) : err
    );
  }

  error.setPath(fullPath);
  // getLogger().error(error.printForLogging());

  if (res?.headersSent) {
    next!(err); // pass error to default express handler

    return;
  }
  if (!error.logOnly) {
    res?.status(error.getCode()).json(error.printForHTTPResponse());
  }
};
