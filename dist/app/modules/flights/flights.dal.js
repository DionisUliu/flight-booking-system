"use strict";
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
exports.deleteFlight = exports.updateFlight = exports.addNewFlight = exports.getFlightById = exports.getAllFlights = void 0;
const flights_model_1 = __importDefault(require("./flights.model"));
const getAllFlights = (query, projection) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.flightNumber) {
        dbQuery.flightNumber = {
            $regex: query.flightNumber,
            $options: 'i',
        };
    }
    const flights = yield flights_model_1.default.find(dbQuery, projection).populate('airplane', ' name -_id');
    return flights;
});
exports.getAllFlights = getAllFlights;
const getFlightById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flight = yield flights_model_1.default.findById(id);
    return flight;
});
exports.getFlightById = getFlightById;
const addNewFlight = (flight) => __awaiter(void 0, void 0, void 0, function* () {
    const newFlight = yield flights_model_1.default.create(flight);
    return newFlight;
});
exports.addNewFlight = addNewFlight;
const updateFlight = (id, flight) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFlight = yield flights_model_1.default.findByIdAndUpdate(id, flight, {
        new: true,
    });
    return updatedFlight;
});
exports.updateFlight = updateFlight;
const deleteFlight = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flight = yield flights_model_1.default.findByIdAndRemove(id);
    return flight;
});
exports.deleteFlight = deleteFlight;
