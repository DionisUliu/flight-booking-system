import Joi from 'joi';
import { BadRequest } from '../../utils/error';
import { FlightType } from './flights.type';

export const validateFlight = (airplane: FlightType) => {
  const schema = Joi.object()
    .keys({
      departureDate: Joi.date().iso().required(),
      arrivalDate: Joi.date()
        .iso()
        .greater(Joi.ref('departureDate'))
        .required(),
      durationInHours: Joi.number().max(60).required(),
      durationInMiles: Joi.number().max(1000000).required(),
      departureAirport: Joi.string().hex().length(24).required(),
      arrivalAirport: Joi.string().hex().length(24).required(),
      airplane: Joi.string().hex().length(24).required(),
    })
    .required();

  const { error } = schema.validate(airplane);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateGetAllFlightsRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    flightNumber: Joi.string().min(5).max(50),
    fields: Joi.string().min(1).max(150),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
