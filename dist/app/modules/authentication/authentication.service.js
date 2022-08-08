'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyTwoFactorAuthToken =
  exports.completeTwoFactorAuthentication =
  exports.initTwoFactorAuthentication =
  exports.resetPassword =
  exports.requestNewPassword =
  exports.logIn =
  exports.confirmAccount =
  exports.resendConfirmationEmail =
  exports.registerUser =
    void 0;
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const crypto_1 = __importDefault(require('crypto'));
const authentication_check_1 = require('./authentication.check');
const validator = __importStar(require('./authentication.validator'));
const dal = __importStar(require('./authentication.dal'));
const helpers = __importStar(require('./authentication.helpers'));
const twoFactorAuth = __importStar(
  require('../../config/authentication/two_factor_auth'),
);
const errorDetailsConstants_1 = __importDefault(
  require('../../constants/errorDetailsConstants'),
);
const confirmation_levels_1 = __importDefault(
  require('../../constants/confirmation_levels'),
);
const jwt_1 = require('../../config/authentication/jwt');
const error_1 = require('../../utils/error');
const registerUser = ({ requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateUserRegisterRequest({ input: requestBody });
    const userWithTheSameEmail = yield dal.findUser({
      query: {
        email: requestBody.email.toLowerCase(),
      },
    });
    if (userWithTheSameEmail) {
      throw new error_1.UnprocessableEntity(
        errorDetailsConstants_1.default.DUPLICATE_EMAILS,
      );
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(
      requestBody.password,
      salt,
    );
    const newUserBody = {
      email: requestBody.email.toLowerCase(),
      password: hashedPassword,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      phoneNumber: requestBody.phoneNumber,
      confirmationToken: crypto_1.default.randomBytes(32).toString('hex'),
      confirmationLevel: confirmation_levels_1.default.PENDING,
      isAdmin: false,
      twoFactorAuth: { active: false },
    };
    const createdUser = yield dal.createUser({ content: newUserBody });
    helpers.sendConfirmationEmail({
      user: createdUser,
      redirectUrl: requestBody.redirectUrl,
    });
  });
exports.registerUser = registerUser;
const resendConfirmationEmail = ({ requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateResendConfirmationEmailRequest({ input: requestBody });
    const query = {
      confirmationLevel: confirmation_levels_1.default.PENDING,
      email: requestBody.email.toLowerCase(),
    };
    const update = {
      confirmationToken: crypto_1.default.randomBytes(32).toString('hex'),
    };
    const updatedUser = yield dal.updateUser({
      query,
      content: update,
    });
    if (!updatedUser) {
      throw new error_1.NotFound(
        errorDetailsConstants_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED,
      );
    }
    yield helpers.sendConfirmationEmail({
      user: updatedUser,
      redirectUrl: requestBody.redirectUrl,
    });
    return updatedUser;
  });
exports.resendConfirmationEmail = resendConfirmationEmail;
const confirmAccount = ({ requestParams }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateConfirmAccountRequest({ input: requestParams });
    const query = {
      confirmationLevel: confirmation_levels_1.default.PENDING,
      confirmationToken: requestParams.token,
    };
    const update = {
      confirmationToken: crypto_1.default.randomBytes(32).toString('hex'),
      confirmationLevel: confirmation_levels_1.default.CONFIRMED,
    };
    const updatedUser = yield dal.updateUser({
      query,
      content: update,
    });
    if (!updatedUser) {
      throw new error_1.NotFound(
        errorDetailsConstants_1.default.USER_NOT_FOUND_OR_ACCOUNT_CONFIRMED,
      );
    }
  });
exports.confirmAccount = confirmAccount;
const logIn = ({ requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    validator.validateLogInRequest({ input: requestBody });
    const user = yield dal.findUser({
      query: { email: requestBody.email.toLowerCase() },
    });
    (0, authentication_check_1.checkIfUserWithGivenUsernameExists)(user);
    yield (0,
    authentication_check_1.checkIfPasswordsMatch)(user === null || user === void 0 ? void 0 : user.password, requestBody.password);
    (0,
    authentication_check_1.checkIfUserAccountIsNotConfirmed)(user === null || user === void 0 ? void 0 : user.confirmationLevel);
    const sessionToken = (0, jwt_1.createToken)(user);
    const userWithToken = Object.assign(
      Object.assign(
        {},
        user === null || user === void 0 ? void 0 : user.toJSON(),
      ),
      { token: sessionToken },
    );
    delete userWithToken.password;
    (_a = userWithToken.twoFactorAuth) === null || _a === void 0
      ? true
      : delete _a.secret;
    return userWithToken;
  });
exports.logIn = logIn;
const requestNewPassword = ({ requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateResetPasswordRequest({ input: requestBody });
    const confirmationToken = crypto_1.default.randomBytes(32).toString('hex');
    const query = { email: requestBody.email.toLowerCase() };
    const update = { confirmationToken };
    const updatedUser = yield dal.updateUser({
      query,
      content: update,
    });
    (0, authentication_check_1.checkIfUserAccountExists)(updatedUser);
    yield helpers.sendEmailWithResetPasswordLink({
      user: updatedUser,
      redirectUrl: requestBody.redirectUrl,
    });
  });
exports.requestNewPassword = requestNewPassword;
const resetPassword = ({ requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validatePasswordUpdateRequest({ input: requestBody });
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(
      requestBody.password,
      salt,
    );
    const query = { confirmationToken: requestBody.token };
    const update = { password: hashedPassword };
    const updatedUser = yield dal.updateUser({
      query,
      content: update,
    });
    (0, authentication_check_1.checkIfUserAccountExists)(updatedUser);
  });
exports.resetPassword = resetPassword;
const initTwoFactorAuthentication = ({ userId }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: userId };
    const user = yield dal.findUser({ query });
    (0, authentication_check_1.checkIfUserAccountExists)(user);
    const secret = twoFactorAuth.generateSecret(user.email);
    const qrCodeBase64 = yield twoFactorAuth.generateQRCode(secret);
    yield dal.updateUser({
      query,
      content: { 'twoFactorAuth.secret': secret },
    });
    return qrCodeBase64;
  });
exports.initTwoFactorAuthentication = initTwoFactorAuthentication;
const completeTwoFactorAuthentication = ({ userId, requestBody }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateCompleteTwoFactorAuthRequest({ input: requestBody });
    const { token } = requestBody;
    const query = { _id: userId };
    const user = yield dal.findUser({ query });
    (0, authentication_check_1.checkIfUserAccountExists)(user);
    (0, authentication_check_1.checkIfTwoFactorAuthIsEnabled)(user);
    (0, authentication_check_1.checkIfTokenIsValid)(user, token);
    const update = { 'twoFactorAuth.active': true };
    yield dal.updateUser({
      query,
      content: update,
    });
  });
exports.completeTwoFactorAuthentication = completeTwoFactorAuthentication;
const verifyTwoFactorAuthToken = ({ userId, requestParams }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    validator.validateVerifyTwoFactorAuthTokenRequest({ input: requestParams });
    const { token } = requestParams;
    const user = yield dal.findUser({ query: { _id: userId } });
    (0, authentication_check_1.checkIfUserAccountExists)(user);
    (0, authentication_check_1.checkIfTwoFactorAuthIsActivated)(user);
    (0, authentication_check_1.checkIfTokenIsValid)(user, token);
  });
exports.verifyTwoFactorAuthToken = verifyTwoFactorAuthToken;
