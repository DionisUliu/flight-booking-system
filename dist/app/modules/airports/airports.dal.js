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
exports.deleteAirport = exports.updateAirport = exports.addNewAirport = exports.getAirportById = exports.getAllAirports = void 0;
const airports_model_1 = __importDefault(require("./airports.model"));
const getAllAirports = (query, projection) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.name) {
        dbQuery.name = {
            $regex: query.name,
            $options: 'i',
        };
    }
    const airports = yield airports_model_1.default.find(dbQuery, projection);
    return airports;
});
exports.getAllAirports = getAllAirports;
const getAirportById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airport = yield airports_model_1.default.findById(id);
    return airport;
});
exports.getAirportById = getAirportById;
const addNewAirport = (airport) => __awaiter(void 0, void 0, void 0, function* () {
    const newAirport = yield airports_model_1.default.create(airport);
    return newAirport;
});
exports.addNewAirport = addNewAirport;
const updateAirport = (id, airport) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAirport = yield airports_model_1.default.findByIdAndUpdate(id, airport, {
        new: true,
    });
    return updatedAirport;
});
exports.updateAirport = updateAirport;
const deleteAirport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airport = yield airports_model_1.default.findByIdAndRemove(id);
    return airport;
});
exports.deleteAirport = deleteAirport;
