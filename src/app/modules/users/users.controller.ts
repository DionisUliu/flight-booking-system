import { NextFunction, Request, Response } from 'express';
import * as service from './users.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.getAllUsers({
      requestParams: req.query,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.getProfile({
      userId: req.params.id,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.updateProfile({
      userId: req.params.id,
      requestBody: req.body,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
