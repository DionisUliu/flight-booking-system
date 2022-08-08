import { BadRequest, NotFound } from '../../utils/error';
import { FlightType, QueryType, RequestParamsType } from './flights.type';
import * as dal from './flights.dal';
import * as airportDal from '../airports/airports.dal';
import * as airplaneDal from '../airplanes/airplanes.dal';
import * as validator from './flights.validator';
import errorDetailsConstants from '../../constants/errorDetailsConstants';
import { generateSeatNumbers } from './flights.utils';

const getAllFlights = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllFlightsRequest({ input: requestParams });

  const projection = requestParams?.fields
    ? requestParams.fields.split(',')
    : [
        'flightNumber',
        'departureDate',
        'arrivalDate',
        'durationInHours',
        'durationInMiles',
        'departureAirport',
        'arrivalAirport',
        'totalAmountOfTickets',
        'availableSeatNumbers',
        'airplane',
      ];

  const query: QueryType = {};
  if (requestParams?.flightNumber) {
    query.flightNumber = requestParams.flightNumber;
  }
  const flights = await dal.getAllFlights(query, projection);
  return flights;
};

const getFlightById = async (id: string) => {
  const flight = await dal.getFlightById(id);
  if (!flight) {
    throw new NotFound(errorDetailsConstants.FlIGHT_NOT_FOUND);
  }
  return flight;
};

const addNewFlight = async (flight: FlightType) => {
  validator.validateFlight(flight);
  const departureAirport = await airportDal.getAirportById(
    flight.departureAirport
  );
  if (!departureAirport) {
    throw new BadRequest(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }
  const departAirport = departureAirport.getAirportImportantProperties();

  const arrivalAirport = await airportDal.getAirportById(flight.arrivalAirport);
  if (!arrivalAirport) {
    throw new BadRequest(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }

  const arrAirport = departureAirport.getAirportImportantProperties();

  const airplane = await airplaneDal.getAirplaneById(flight.airplane);
  if (!airplane) {
    throw new BadRequest(errorDetailsConstants.AIRPLANE_NOT_FOUND);
  }

  const newFlight = {
    departureDate: flight.departureDate,
    arrivalDate: flight.departureDate,
    durationInHours: flight.durationInHours,
    durationInMiles: flight.durationInMiles,
    departureAirport: departAirport,
    arrivalAirport: arrAirport,
    totalAmountOfTickets: airplane.seats,
    availableSeatNumbers: generateSeatNumbers(airplane.seats),
    airplane: flight.airplane,
  };
  const result = await dal.addNewFlight(newFlight);
  return result;
};

const updateFlight = async (id: string, flight: FlightType) => {
  validator.validateFlight(flight);
  const departureAirport = await airportDal.getAirportById(
    flight.departureAirport
  );
  if (!departureAirport) {
    throw new BadRequest(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }
  const departAirport = departureAirport.getAirportImportantProperties();

  const arrivalAirport = await airportDal.getAirportById(flight.arrivalAirport);
  if (!arrivalAirport) {
    throw new BadRequest(errorDetailsConstants.AIRPORT_NOT_FOUND);
  }

  const arrAirport = departureAirport.getAirportImportantProperties();

  const airplane = await airplaneDal.getAirplaneById(flight.airplane);
  if (!airplane) {
    throw new BadRequest(errorDetailsConstants.AIRPLANE_NOT_FOUND);
  }

  const newFlight = {
    departureDate: flight.departureDate,
    arrivalDate: flight.departureDate,
    durationInHours: flight.durationInHours,
    durationInMiles: flight.durationInMiles,
    departureAirport: departAirport,
    arrivalAirport: arrAirport,
    totalAmountOfTickets: airplane.seats,
    availableSeatNumbers: generateSeatNumbers(airplane.seats),
    airplane: flight.airplane,
  };

  const updatedFlight = await dal.updateFlight(id, newFlight);
  if (!updatedFlight) {
    throw new NotFound(errorDetailsConstants.FlIGHT_NOT_FOUND);
  }
};
const deleteFlightById = async (id: string) => {
  const flight = await dal.deleteFlight(id);
  if (!flight) {
    throw new NotFound(errorDetailsConstants.FlIGHT_NOT_FOUND);
  }
};
export {
  getAllFlights,
  getFlightById,
  addNewFlight,
  updateFlight,
  deleteFlightById,
};
