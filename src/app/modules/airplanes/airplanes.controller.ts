import { NextFunction, Request, Response } from 'express';
import { AirplaneType } from './airplanes.type';
import * as service from './airplanes.service';

const getAllAirplanes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const airplanes = await service.getAllAirplanes({
      requestParams: req.query,
    });
    res.status(200).json(airplanes);
  } catch (error) {
    next(error);
  }
};
const getAirplaneById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await service.getAirplaneById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const addNewAirplane = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const airplane: AirplaneType = req.body;
    const result = await service.addNewAirplane(airplane);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateAirplane = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const airplane = req.body;
    await service.updateAirplane(id, airplane);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const deleteAirplaneById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.deleteAirplaneById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  getAirplaneById,
  getAllAirplanes,
  addNewAirplane,
  updateAirplane,
  deleteAirplaneById,
};
