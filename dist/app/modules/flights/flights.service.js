"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlightById = exports.updateFlight = exports.addNewFlight = exports.getFlightById = exports.getAllFlights = void 0;
const error_1 = require("../../utils/error");
const dal = __importStar(require("./flights.dal"));
const airportDal = __importStar(require("../airports/airports.dal"));
const airplaneDal = __importStar(require("../airplanes/airplanes.dal"));
const validator = __importStar(require("./flights.validator"));
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const flights_utils_1 = require("./flights.utils");
const getAllFlights = ({ requestParams }) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateGetAllFlightsRequest({ input: requestParams });
    const projection = (requestParams === null || requestParams === void 0 ? void 0 : requestParams.fields)
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
    const query = {};
    if (requestParams === null || requestParams === void 0 ? void 0 : requestParams.flightNumber) {
        query.flightNumber = requestParams.flightNumber;
    }
    const flights = yield dal.getAllFlights(query, projection);
    return flights;
});
exports.getAllFlights = getAllFlights;
const getFlightById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flight = yield dal.getFlightById(id);
    if (!flight) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.FlIGHT_NOT_FOUND);
    }
    return flight;
});
exports.getFlightById = getFlightById;
const addNewFlight = (flight) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateFlight(flight);
    const departureAirport = yield airportDal.getAirportById(flight.departureAirport);
    if (!departureAirport) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
    const departAirport = departureAirport.getAirportImportantProperties();
    const arrivalAirport = yield airportDal.getAirportById(flight.arrivalAirport);
    if (!arrivalAirport) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
    const arrAirport = departureAirport.getAirportImportantProperties();
    const airplane = yield airplaneDal.getAirplaneById(flight.airplane);
    if (!airplane) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPLANE_NOT_FOUND);
    }
    const newFlight = {
        departureDate: flight.departureDate,
        arrivalDate: flight.departureDate,
        durationInHours: flight.durationInHours,
        durationInMiles: flight.durationInMiles,
        departureAirport: departAirport,
        arrivalAirport: arrAirport,
        totalAmountOfTickets: airplane.seats,
        availableSeatNumbers: (0, flights_utils_1.generateSeatNumbers)(airplane.seats),
        airplane: flight.airplane,
    };
    const result = yield dal.addNewFlight(newFlight);
    return result;
});
exports.addNewFlight = addNewFlight;
const updateFlight = (id, flight) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateFlight(flight);
    const departureAirport = yield airportDal.getAirportById(flight.departureAirport);
    if (!departureAirport) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
    const departAirport = departureAirport.getAirportImportantProperties();
    const arrivalAirport = yield airportDal.getAirportById(flight.arrivalAirport);
    if (!arrivalAirport) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
    const arrAirport = departureAirport.getAirportImportantProperties();
    const airplane = yield airplaneDal.getAirplaneById(flight.airplane);
    if (!airplane) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.AIRPLANE_NOT_FOUND);
    }
    const newFlight = {
        departureDate: flight.departureDate,
        arrivalDate: flight.departureDate,
        durationInHours: flight.durationInHours,
        durationInMiles: flight.durationInMiles,
        departureAirport: departAirport,
        arrivalAirport: arrAirport,
        totalAmountOfTickets: airplane.seats,
        availableSeatNumbers: (0, flights_utils_1.generateSeatNumbers)(airplane.seats),
        airplane: flight.airplane,
    };
    const updatedFlight = yield dal.updateFlight(id, newFlight);
    if (!updatedFlight) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.FlIGHT_NOT_FOUND);
    }
});
exports.updateFlight = updateFlight;
const deleteFlightById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flight = yield dal.deleteFlight(id);
    if (!flight) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.FlIGHT_NOT_FOUND);
    }
});
exports.deleteFlightById = deleteFlightById;
