import { NextFunction, Request, Response } from 'express';
import { TicketType } from './tickets.type';
import * as service from './tickets.service';

const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await service.getAllTickets({
      requestParams: req.query,
    });
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

const addNewTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket: TicketType = req.body;
    const result = await service.addNewTicket(ticket);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteTikcetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.deleteTicketById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { getAllTickets, addNewTicket, deleteTikcetById };
