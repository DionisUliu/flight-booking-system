import { NotFound } from '../../utils/error';
import { AirportType, QueryType, RequestParamsType } from './airports.type';
import * as dal from './airports.dal';
import * as validator from './airports.validator';
import errorDetailsConstants from '../../constants/errorDetailsConstants';

const getAllAirports = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllAirportsRequest({ input: requestParams });

  const projection = requestParams?.fields
    ? requestParams.fields.split(',')
    : ['name', 'code', 'city', 'state'];

  const query: QueryType = {};
  if (requestParams?.name) {
    query.name = requestParams.name;
  }

  const airports = await dal.getAllAirports(query, projection);
  return airports;
};
const getAirportsById = async (id: string) => {
  const airport = await dal.getAirportById(id);
  if (!airport) {
    throw new NotFound(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }
  return airport;
};
const addNewAirport = async (airport: AirportType) => {
  validator.validateAirport(airport);
  const newAirport = await dal.addNewAirport(airport);
  return newAirport;
};
const updateAirport = async (id: string, airport: AirportType) => {
  validator.validateAirport(airport);

  const updatedAirport = await dal.updateAirport(id, airport);
  if (!updatedAirport) {
    throw new NotFound(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }
};
const deleteAirportById = async (id: string) => {
  const airport = await dal.deleteAirport(id);
  if (!airport) {
    throw new NotFound(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }
};
export {
  getAllAirports,
  getAirportsById,
  addNewAirport,
  updateAirport,
  deleteAirportById,
};
