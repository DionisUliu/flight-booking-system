import Joi from 'joi';
import { BadRequest } from '../../utils/error';
import { TicketType } from './tickets.type';

export const validateTicket = (ticket: TicketType) => {
  const schema = Joi.object()
    .keys({
      seatNumber: Joi.number().min(0).max(2000),
      user: Joi.string().hex().length(24).required(),
      price: Joi.number().min(5).max(10000),
      class: Joi.string().min(1).max(1),
      flight: Joi.string().hex().length(24).required(),
    })
    .required();

  const { error } = schema.validate(ticket);

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};

export const validateGetAllTicketsRequest = ({ input }: any) => {
  const schema = Joi.object().keys({
    user: Joi.string().min(5).max(50),
    fields: Joi.string().min(1).max(150),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};
