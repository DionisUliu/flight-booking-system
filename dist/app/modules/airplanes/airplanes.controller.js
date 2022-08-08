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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAirplaneById = exports.updateAirplane = exports.addNewAirplane = exports.getAllAirplanes = exports.getAirplaneById = void 0;
const service = __importStar(require("./airplanes.service"));
const getAllAirplanes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplanes = yield service.getAllAirplanes({
            requestParams: req.query,
        });
        res.status(200).json(airplanes);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAirplanes = getAllAirplanes;
const getAirplaneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield service.getAirplaneById(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAirplaneById = getAirplaneById;
const addNewAirplane = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplane = req.body;
        const result = yield service.addNewAirplane(airplane);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.addNewAirplane = addNewAirplane;
const updateAirplane = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const airplane = req.body;
        yield service.updateAirplane(id, airplane);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.updateAirplane = updateAirplane;
const deleteAirplaneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.deleteAirplaneById(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAirplaneById = deleteAirplaneById;
