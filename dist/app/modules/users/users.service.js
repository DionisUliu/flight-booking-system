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
exports.updateProfile = exports.getProfile = exports.getAllUsers = void 0;
const validator = __importStar(require("./users.validator"));
const dal = __importStar(require("./users.dal"));
const error_1 = require("../../utils/error");
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const getAllUsers = ({ requestParams }) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateGetAllUsersRequest({ input: requestParams });
    const projection = (requestParams === null || requestParams === void 0 ? void 0 : requestParams.fields)
        ? requestParams.fields.split(',')
        : ['firstName', 'lastName', 'email', 'isAdmin'];
    const query = {};
    if (requestParams === null || requestParams === void 0 ? void 0 : requestParams.firstName) {
        query.firstName = requestParams.firstName;
    }
    const users = yield dal.getAllUsers(query, projection);
    return users;
});
exports.getAllUsers = getAllUsers;
const getProfile = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const requestParams = { id: userId };
    validator.validateGetProfileRequest({ input: requestParams });
    const query = { _id: userId };
    const projection = ['firstName', 'lastName', 'email', 'phoneNumber'];
    const userFromDB = yield dal.findOneUser({ query, projection });
    if (!userFromDB) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.USER_NOT_FOUND);
    }
    return userFromDB;
});
exports.getProfile = getProfile;
const updateProfile = ({ userId, requestBody, }) => __awaiter(void 0, void 0, void 0, function* () {
    validator.validateUpdateProfileRequest({ input: requestBody });
    const query = { _id: userId };
    const userFromDB = yield dal.findOneUser({ query });
    if (!userFromDB) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.USER_NOT_FOUND);
    }
    if (requestBody.firstName || requestBody.lastName) {
        const newFirstName = requestBody.firstName;
        const newLastName = requestBody.lastName;
        const existingUser = yield dal.findUserToUpdate({
            query: {
                equal: {
                    firstName: newFirstName,
                    lastName: newLastName,
                },
                notEqual: {
                    _id: userFromDB._id,
                },
            },
        });
        if (existingUser) {
            throw new error_1.UnprocessableEntity(errorDetailsConstants_1.default.USER_EXIST);
        }
    }
    yield dal.updateUser({
        query: { _id: userId },
        content: requestBody,
    });
});
exports.updateProfile = updateProfile;
