import { DbQueryType, QueryType, PostFlightType } from './flights.type';
import Flight from './flights.model';

const getAllFlights = async (query: QueryType, projection: string[]) => {
  const dbQuery: DbQueryType = {};

  if (query.flightNumber) {
    dbQuery.flightNumber = {
      $regex: query.flightNumber,
      $options: 'i',
    };
  }

  const flights = await Flight.find(dbQuery, projection).populate(
    'airplane',
    ' name -_id'
  );
  return flights;
};
const getFlightById = async (id: string) => {
  const flight = await Flight.findById(id);
  return flight;
};
const addNewFlight = async (flight: PostFlightType) => {
  const newFlight = await Flight.create(flight);
  return newFlight;
};
const updateFlight = async (id: string, flight: PostFlightType) => {
  const updatedFlight = await Flight.findByIdAndUpdate(id, flight, {
    new: true,
  });
  return updatedFlight;
};
const deleteFlight = async (id: string) => {
  const flight = await Flight.findByIdAndRemove(id);
  return flight;
};

export {
  getAllFlights,
  getFlightById,
  addNewFlight,
  updateFlight,
  deleteFlight,
};
