import { Request, Response, NextFunction } from 'express';
import * as service from './authentication.service';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.registerUser({ requestBody: req.body });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const confirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.confirmAccount({ requestParams: req.query });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const resendConfirmationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.resendConfirmationEmail({ requestBody: req.body });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.logIn({ requestBody: req.body });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const requestNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.requestNewPassword({ requestBody: req.body });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.resetPassword({ requestBody: req.body });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const initTwoFactorAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.initTwoFactorAuthentication({
      userId: req.user?._id,
    });
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const completeTwoFactorAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.completeTwoFactorAuthentication({
      userId: req.user?._id,
      requestBody: req.body,
    });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const verifyTwoFactorAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.verifyTwoFactorAuthToken({
      userId: req.user?._id,
      requestParams: req.query,
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
