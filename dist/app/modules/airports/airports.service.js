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
exports.deleteAirportById = exports.updateAirport = exports.addNewAirport = exports.getAirportsById = exports.getAllAirports = void 0;
const error_1 = require("../../utils/error");
const dal = __importStar(require("./airports.dal"));
const validator = __importStar(require("./airports.validator"));
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const getAllAirports = ({ requestParams }) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateGetAllAirportsRequest({ input: requestParams });
    const projection = (requestParams === null || requestParams === void 0 ? void 0 : requestParams.fields)
        ? requestParams.fields.split(',')
        : ['name', 'code', 'city', 'state'];
    const query = {};
    if (requestParams === null || requestParams === void 0 ? void 0 : requestParams.name) {
        query.name = requestParams.name;
    }
    const airports = yield dal.getAllAirports(query, projection);
    return airports;
});
exports.getAllAirports = getAllAirports;
const getAirportsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airport = yield dal.getAirportById(id);
    if (!airport) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
    return airport;
});
exports.getAirportsById = getAirportsById;
const addNewAirport = (airport) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateAirport(airport);
    const newAirport = yield dal.addNewAirport(airport);
    return newAirport;
});
exports.addNewAirport = addNewAirport;
const updateAirport = (id, airport) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateAirport(airport);
    const updatedAirport = yield dal.updateAirport(id, airport);
    if (!updatedAirport) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
});
exports.updateAirport = updateAirport;
const deleteAirportById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airport = yield dal.deleteAirport(id);
    if (!airport) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPORT_NOT_FOUND);
    }
});
exports.deleteAirportById = deleteAirportById;
