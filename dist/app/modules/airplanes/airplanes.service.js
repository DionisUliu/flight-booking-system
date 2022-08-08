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
exports.deleteAirplaneById = exports.updateAirplane = exports.addNewAirplane = exports.getAirplaneById = exports.getAllAirplanes = void 0;
const error_1 = require("../../utils/error");
const dal = __importStar(require("./airplanes.dal"));
const validator = __importStar(require("./airplanes.validator"));
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const getAllAirplanes = ({ requestParams }) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateGetAllAirplanesRequest({ input: requestParams });
    const projection = (requestParams === null || requestParams === void 0 ? void 0 : requestParams.fields)
        ? requestParams.fields.split(',')
        : ['name', 'seats', 'fuelCapacity'];
    const query = {};
    if (requestParams === null || requestParams === void 0 ? void 0 : requestParams.name) {
        query.name = requestParams.name;
    }
    const airplanes = yield dal.getAllAirplanes(query, projection);
    return airplanes;
});
exports.getAllAirplanes = getAllAirplanes;
const getAirplaneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airplane = yield dal.getAirplaneById(id);
    if (!airplane) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPLANE_NOT_FOUND);
    }
    return airplane;
});
exports.getAirplaneById = getAirplaneById;
const addNewAirplane = (airplane) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateAirplane(airplane);
    const newAirplane = yield dal.addNewAirplane(airplane);
    return newAirplane;
});
exports.addNewAirplane = addNewAirplane;
const updateAirplane = (id, airplane) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateAirplane(airplane);
    const updatedAirplane = yield dal.updateAirplane(id, airplane);
    if (!updatedAirplane) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPLANE_NOT_FOUND);
    }
});
exports.updateAirplane = updateAirplane;
const deleteAirplaneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airplane = yield dal.deleteAirplane(id);
    if (!airplane) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.AIRPLANE_NOT_FOUND);
    }
});
exports.deleteAirplaneById = deleteAirplaneById;
