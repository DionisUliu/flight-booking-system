import Joi from 'joi';
import { BadRequest } from '../../utils/error';
import { AirportType } from './airports.type';

export const validateAirport = (airport: AirportType) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string().min(5).max(50).required(),
      city: Joi.string().min(3).max(100).required(),
      state: Joi.string().min(3).max(100).required(),
    })
    .required();

  const { error } = schema.validate(airport);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateGetAllAirportsRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(50),
    fields: Joi.string().min(1).max(150),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
