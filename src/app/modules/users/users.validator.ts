import Joi from 'joi';

import { BadRequest } from '../../utils/error';

export const validateGetProfileRequest = ({ input }: any) => {
  const schema = Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .required();

  const { error } = schema.validate(input);

  if (error) {
    throw new BadRequest(error?.details[0].message);
  }
};

export const validateUpdateProfileRequest = ({ input }: any) => {
  const schema = Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email(),
      phoneNumber: Joi.string().required(),
    })
    .required();

  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
export const validateGetAllUsersRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(2).max(150),
    fields: Joi.string().min(1).max(150),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
