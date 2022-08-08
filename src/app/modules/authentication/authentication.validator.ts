import Joi from 'joi';

import { BadRequest } from '../../utils/error';

export const validateUserRegisterRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    redirectUrl: Joi.string().uri().required(),
  });

  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateResendConfirmationEmailRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    redirectUrl: Joi.string().uri().required(),
  });

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateConfirmAccountRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateLogInRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateResetPasswordRequest = ({ input }: any) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
      redirectUrl: Joi.string().uri().required(),
    })
    .required();

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validatePasswordUpdateRequest = ({ input }: any) => {
  const schema = Joi.object()
    .keys({
      token: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    })
    .required();

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateCompleteTwoFactorAuthRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateVerifyTwoFactorAuthTokenRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
