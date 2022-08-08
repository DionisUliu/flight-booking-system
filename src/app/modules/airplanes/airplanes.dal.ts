import { AirplaneType, DbQueryType, QueryType } from './airplanes.type';
import Airplane from './airplanes.model';

const getAllAirplanes = async (query: QueryType, projection: string[]) => {
  const dbQuery: DbQueryType = {};

  if (query.name) {
    dbQuery.name = {
      $regex: query.name,
      $options: 'i',
    };
  }

  const airplanes = await Airplane.find(dbQuery, projection);
  return airplanes;
};
const getAirplaneById = async (id: string) => {
  const airplane = await Airplane.findById(id);
  return airplane;
};
const addNewAirplane = async (airplane: AirplaneType) => {
  const newAirplane = await Airplane.create(airplane);
  return newAirplane;
};
const updateAirplane = async (id: string, airplane: AirplaneType) => {
  const updatedAirplane = await Airplane.findByIdAndUpdate(id, airplane, {
    new: true,
  });
  return updatedAirplane;
};
const deleteAirplane = async (id: string) => {
  const airplane = await Airplane.findByIdAndRemove(id);
  return airplane;
};

export {
  getAllAirplanes,
  getAirplaneById,
  addNewAirplane,
  updateAirplane,
  deleteAirplane,
};
