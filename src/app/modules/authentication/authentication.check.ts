import Bcrypt from 'bcryptjs';
import errorDetailsConstants from '../../constants/errorDetailsConstants';
import {
  NotAuthenticated,
  NotFound,
  UnprocessableEntity,
} from '../../utils/error';
import * as twoFactorAuth from '../../config/authentication/two_factor_auth';
import confirmationLevels from '../../constants/confirmation_levels';

export function checkIfTwoFactorAuthIsActivated(user: any) {
  if (!user.twoFactorAuth.active) {
    throw new UnprocessableEntity(errorDetailsConstants.NO_2FA);
  }
}
export function checkIfTokenIsValid(user: any, token: string) {
  const tokenIsValid = twoFactorAuth.validateToken(
    user.twoFactorAuth.secret,
    token
  );

  if (!tokenIsValid) {
    throw new UnprocessableEntity(errorDetailsConstants.INVALID_2FA_TOKEN);
  }
}

export function checkIfTwoFactorAuthIsEnabled(user: any) {
  if (!user.twoFactorAuth.secret) {
    throw new UnprocessableEntity(errorDetailsConstants.NO_2FA);
  }
}
export function checkIfUserAccountExists(user: any) {
  if (!user) {
    throw new NotFound(errorDetailsConstants.USER_NOT_FOUND);
  }
}
export function checkIfUserWithGivenUsernameExists(user: any) {
  if (!user) {
    throw new NotAuthenticated(errorDetailsConstants.USER_NOT_FOUND);
  }
}
export async function checkIfPasswordsMatch(
  existingPassword: any,
  givenPassword: any
) {
  const passwordsMatch = await Bcrypt.compare(givenPassword, existingPassword);

  if (!passwordsMatch) {
    throw new NotAuthenticated(errorDetailsConstants.INVALID_PASSWORD);
  }
}

export function checkIfUserAccountIsNotConfirmed(
  currentConfirmationLevel: any
) {
  const accountNotConfirmed =
    currentConfirmationLevel === confirmationLevels.PENDING;

  if (accountNotConfirmed) {
    throw new NotAuthenticated(errorDetailsConstants.ACCOUNT_NOT_CONFIRMED);
  }
}
