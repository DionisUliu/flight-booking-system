import { NotFound } from '../../utils/error';
import { AirplaneType, QueryType, RequestParamsType } from './airplanes.type';
import * as dal from './airplanes.dal';
import * as validator from './airplanes.validator';
import errorDetailsConstants from '../../constants/errorDetailsConstants';

const getAllAirplanes = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllAirplanesRequest({ input: requestParams });

  const projection = requestParams?.fields
    ? requestParams.fields.split(',')
    : ['name', 'seats', 'fuelCapacity'];

  const query: QueryType = {};
  if (requestParams?.name) {
    query.name = requestParams.name;
  }

  const airplanes = await dal.getAllAirplanes(query, projection);
  return airplanes;
};
const getAirplaneById = async (id: string) => {
  const airplane = await dal.getAirplaneById(id);
  if (!airplane) {
    throw new NotFound(errorDetailsConstants.AIRPLANE_NOT_FOUND);
  }
  return airplane;
};
const addNewAirplane = async (airplane: AirplaneType) => {
  validator.validateAirplane(airplane);
  const newAirplane = await dal.addNewAirplane(airplane);
  return newAirplane;
};
const updateAirplane = async (id: string, airplane: AirplaneType) => {
  validator.validateAirplane(airplane);

  const updatedAirplane = await dal.updateAirplane(id, airplane);
  if (!updatedAirplane) {
    throw new NotFound(errorDetailsConstants.AIRPLANE_NOT_FOUND);
  }
};
const deleteAirplaneById = async (id: string) => {
  const airplane = await dal.deleteAirplane(id);
  if (!airplane) {
    throw new NotFound(errorDetailsConstants.AIRPLANE_NOT_FOUND);
  }
};
export {
  getAllAirplanes,
  getAirplaneById,
  addNewAirplane,
  updateAirplane,
  deleteAirplaneById,
};
