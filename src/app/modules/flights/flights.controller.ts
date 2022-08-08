import { NextFunction, Request, Response } from 'express';
import { FlightType } from './flights.type';
import * as service from './flights.service';

const getAllAFlights = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const flights = await service.getAllFlights({
      requestParams: req.query,
    });
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};
const getFlightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await service.getFlightById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const addNewFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const flight: FlightType = req.body;
    const result = await service.addNewFlight(flight);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const flight = req.body;
    await service.updateFlight(id, flight);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const deleteFlightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.deleteFlightById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getFlightById,
  getAllAFlights,
  addNewFlight,
  updateFlight,
  deleteFlightById,
};
