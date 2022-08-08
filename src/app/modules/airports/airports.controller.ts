import { NextFunction, Request, Response } from 'express';
import { AirportType } from './airports.type';
import * as service from './airports.service';

const getAllAirports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.getAllAirports({
      requestParams: req.query,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getAirportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const airport = await service.getAirportsById(id);
    res.status(200).json(airport);
  } catch (error) {
    next(error);
  }
};
const addNewAirport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const airport: AirportType = req.body;
    const result = await service.addNewAirport(airport);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateAirport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const airport = req.body;
    await service.updateAirport(id, airport);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const deleteAirportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.deleteAirportById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getAllAirports,
  getAirportById,
  addNewAirport,
  updateAirport,
  deleteAirportById,
};
