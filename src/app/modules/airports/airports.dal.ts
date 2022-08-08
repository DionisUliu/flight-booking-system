import Airport from './airports.model';
import { AirportType, DbQueryType, QueryType } from './airports.type';

const getAllAirports = async (query: QueryType, projection: string[]) => {
  const dbQuery: DbQueryType = {};

  if (query.name) {
    dbQuery.name = {
      $regex: query.name,
      $options: 'i',
    };
  }

  const airports = await Airport.find(dbQuery, projection);
  return airports;
};
const getAirportById = async (id: string) => {
  const airport = await Airport.findById(id);
  return airport;
};
const addNewAirport = async (airport: AirportType) => {
  const newAirport = await Airport.create(airport);
  return newAirport;
};
const updateAirport = async (id: string, airport: AirportType) => {
  const updatedAirport = await Airport.findByIdAndUpdate(id, airport, {
    new: true,
  });
  return updatedAirport;
};
const deleteAirport = async (id: string) => {
  const airport = await Airport.findByIdAndRemove(id);
  return airport;
};

export {
  getAllAirports,
  getAirportById,
  addNewAirport,
  updateAirport,
  deleteAirport,
};
