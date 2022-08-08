import Bcrypt from 'bcryptjs';
import Crypto from 'crypto';
import {
  checkIfTokenIsValid,
  checkIfTwoFactorAuthIsActivated,
  checkIfTwoFactorAuthIsEnabled,
  checkIfUserAccountExists,
  checkIfUserWithGivenUsernameExists,
  checkIfPasswordsMatch,
  checkIfUserAccountIsNotConfirmed,
} from './authentication.check';
import * as validator from './authentication.validator';
import * as dal from './authentication.dal';
import * as helpers from './authentication.helpers';
import * as twoFactorAuth from '../../config/authentication/two_factor_auth';
import errorDetailsConstants from '../../constants/errorDetailsConstants';
import confirmationLevels from '../../constants/confirmation_levels';
import { createToken } from '../../config/authentication/jwt';
import { NotFound, UnprocessableEntity } from '../../utils/error';

export const registerUser = async ({ requestBody }: any) => {
  validator.validateUserRegisterRequest({ input: requestBody });

  const userWithTheSameEmail = await dal.findUser({
    query: {
      email: requestBody.email.toLowerCase(),
    },
  });

  if (userWithTheSameEmail) {
    throw new UnprocessableEntity(errorDetailsConstants.DUPLICATE_EMAILS);
  }

  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(requestBody.password, salt);
  const newUserBody = {
    email: requestBody.email.toLowerCase(),
    password: hashedPassword,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    phoneNumber: requestBody.phoneNumber,
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
    confirmationLevel: confirmationLevels.PENDING,
    isAdmin: false,
    twoFactorAuth: { active: false },
  };
  const createdUser = await dal.createUser({ content: newUserBody });

  helpers.sendConfirmationEmail({
    user: createdUser,
    redirectUrl: requestBody.redirectUrl,
  });
  console.log(createdUser);
};

export const resendConfirmationEmail = async ({ requestBody }: any) => {
  validator.validateResendConfirmationEmailRequest({ input: requestBody });

  const query = {
    confirmationLevel: confirmationLevels.PENDING,
    email: requestBody.email.toLowerCase(),
  };
  const update = {
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
  };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  if (!updatedUser) {
    throw new NotFound(
      errorDetailsConstants.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED
    );
  }

  await helpers.sendConfirmationEmail({
    user: updatedUser,
    redirectUrl: requestBody.redirectUrl,
  });

  return updatedUser;
};

export const confirmAccount = async ({ requestParams }: any) => {
  validator.validateConfirmAccountRequest({ input: requestParams });

  const query = {
    confirmationLevel: confirmationLevels.PENDING,
    confirmationToken: requestParams.token,
  };
  const update = {
    confirmationToken: Crypto.randomBytes(32).toString('hex'),
    confirmationLevel: confirmationLevels.CONFIRMED,
  };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  if (!updatedUser) {
    throw new NotFound(
      errorDetailsConstants.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED
    );
  }
};

export const logIn = async ({ requestBody }: any) => {
  validator.validateLogInRequest({ input: requestBody });

  const user = await dal.findUser({
    query: { email: requestBody.email.toLowerCase() },
  });

  checkIfUserWithGivenUsernameExists(user);
  await checkIfPasswordsMatch(user?.password, requestBody.password);
  checkIfUserAccountIsNotConfirmed(user?.confirmationLevel);

  const sessionToken = createToken(user);
  const userWithToken = {
    ...user?.toJSON(),
    token: sessionToken,
  };

  delete userWithToken.password;
  delete userWithToken.twoFactorAuth?.secret;

  return userWithToken;
};

export const requestNewPassword = async ({ requestBody }: any) => {
  validator.validateResetPasswordRequest({ input: requestBody });

  const confirmationToken = Crypto.randomBytes(32).toString('hex');
  const query = { email: requestBody.email.toLowerCase() };
  const update = { confirmationToken };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  checkIfUserAccountExists(updatedUser);
  await helpers.sendEmailWithResetPasswordLink({
    user: updatedUser,
    redirectUrl: requestBody.redirectUrl,
  });
};

export const resetPassword = async ({ requestBody }: any) => {
  validator.validatePasswordUpdateRequest({ input: requestBody });

  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(requestBody.password, salt);
  const query = { confirmationToken: requestBody.token };
  const update = { password: hashedPassword };
  const updatedUser = await dal.updateUser({
    query,
    content: update,
  });

  checkIfUserAccountExists(updatedUser);
};

export const initTwoFactorAuthentication = async ({ userId }: any) => {
  const query = { _id: userId };
  const user = await dal.findUser({ query });

  checkIfUserAccountExists(user);

  const secret = twoFactorAuth.generateSecret(user!.email);
  const qrCodeBase64 = await twoFactorAuth.generateQRCode(secret);
  await dal.updateUser({
    query,
    content: { 'twoFactorAuth.secret': secret },
  });

  return qrCodeBase64;
};

export const completeTwoFactorAuthentication = async ({
  userId,
  requestBody,
}: any) => {
  validator.validateCompleteTwoFactorAuthRequest({ input: requestBody });

  const { token } = requestBody;
  const query = { _id: userId };
  const user = await dal.findUser({ query });

  checkIfUserAccountExists(user);
  checkIfTwoFactorAuthIsEnabled(user);
  checkIfTokenIsValid(user, token);

  const update = { 'twoFactorAuth.active': true };
  await dal.updateUser({
    query,
    content: update,
  });
};

export const verifyTwoFactorAuthToken = async ({
  userId,
  requestParams,
}: any) => {
  validator.validateVerifyTwoFactorAuthTokenRequest({ input: requestParams });

  const { token } = requestParams;
  const user = await dal.findUser({ query: { _id: userId } });

  checkIfUserAccountExists(user);
  checkIfTwoFactorAuthIsActivated(user);
  checkIfTokenIsValid(user, token);
};
