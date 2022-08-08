import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequest } from '../utils/error';
import errorDetailsConstants from '../constants/errorDetailsConstants';

function validateObjectId(req: Request, res: Response, next: NextFunction) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequest(errorDetailsConstants.INVALID_OBJECT_ID);
  }
  next();
}

export default validateObjectId;
