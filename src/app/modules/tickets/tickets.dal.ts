import { TicketType, DbQueryType, QueryType } from './tickets.type';
import Ticket from './tickets.model';

const getAllTickets = async (query: QueryType, projection: string[]) => {
  const dbQuery: DbQueryType = {};

  if (query.name) {
    dbQuery.name = {
      $regex: query.name,
      $options: 'i',
    };
  }

  const ticket = await Ticket.find(dbQuery, projection);
  return ticket;
};

const addNewTicket = async (ticket: TicketType) => {
  const newTicket = await Ticket.create(ticket);
  return newTicket;
};

const deleteTicket = async (id: string) => {
  const ticket = await Ticket.findByIdAndRemove(id);
  return ticket;
};

export { getAllTickets, addNewTicket, deleteTicket };
