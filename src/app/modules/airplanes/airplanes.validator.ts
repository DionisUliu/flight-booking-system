import Joi from 'joi';
import { BadRequest } from '../../utils/error';
import { AirplaneType } from './airplanes.type';

export const validateAirplane = (airplane: AirplaneType) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string().min(5).max(50).required(),
      seats: Joi.number().min(5).max(200).required(),
      fuelCapacity: Joi.number().min(500).max(2000).required(),
    })
    .required();

  const { error } = schema.validate(airplane);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateGetAllAirplanesRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(50),
    fields: Joi.string().min(1).max(150),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
