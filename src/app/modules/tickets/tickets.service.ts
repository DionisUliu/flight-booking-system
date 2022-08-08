import { NotFound } from '../../utils/error';
import { TicketType, QueryType, RequestParamsType } from './tickets.type';
import * as dal from './tickets.dal';
import * as validator from './tickets.validator';
import errorDetailsConstants from '../../constants/errorDetailsConstants';

const getAllTickets = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllTicketsRequest({ input: requestParams });

  const projection = requestParams?.fields
    ? requestParams.fields.split(',')
    : ['name', 'seats', 'fuelCapacity'];

  const query: QueryType = {};
  if (requestParams?.name) {
    query.name = requestParams.name;
  }

  const ticket = await dal.getAllTickets(query, projection);
  return ticket;
};

const addNewTicket = async (ticket: TicketType) => {
  validator.validateTicket(ticket);
  const newTicket = await dal.addNewTicket(ticket);
  return newTicket;
};
const deleteTicketById = async (id: string) => {
  const ticket = await dal.deleteTicket(id);
  if (!ticket) {
    throw new NotFound(errorDetailsConstants.TICKET_NOT_FOUND);
  }
};
export { getAllTickets, addNewTicket, deleteTicketById };
