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
exports.deleteAirplane = exports.updateAirplane = exports.addNewAirplane = exports.getAirplaneById = exports.getAllAirplanes = void 0;
const airplanes_model_1 = __importDefault(require("./airplanes.model"));
const getAllAirplanes = (query, projection) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.name) {
        dbQuery.name = {
            $regex: query.name,
            $options: 'i',
        };
    }
    const airplanes = yield airplanes_model_1.default.find(dbQuery, projection);
    return airplanes;
});
exports.getAllAirplanes = getAllAirplanes;
const getAirplaneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airplane = yield airplanes_model_1.default.findById(id);
    return airplane;
});
exports.getAirplaneById = getAirplaneById;
const addNewAirplane = (airplane) => __awaiter(void 0, void 0, void 0, function* () {
    const newAirplane = yield airplanes_model_1.default.create(airplane);
    return newAirplane;
});
exports.addNewAirplane = addNewAirplane;
const updateAirplane = (id, airplane) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAirplane = yield airplanes_model_1.default.findByIdAndUpdate(id, airplane, {
        new: true,
    });
    return updatedAirplane;
});
exports.updateAirplane = updateAirplane;
const deleteAirplane = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airplane = yield airplanes_model_1.default.findByIdAndRemove(id);
    return airplane;
});
exports.deleteAirplane = deleteAirplane;
