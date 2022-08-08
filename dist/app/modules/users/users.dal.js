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
exports.updateUser = exports.findUserToUpdate = exports.findOneUser = exports.getAllUsers = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const getAllUsers = (query, projection) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.firstName) {
        dbQuery.firstName = {
            $regex: query.firstName,
            $options: 'i',
        };
    }
    const result = yield users_model_1.default.find(dbQuery, projection);
    return result;
});
exports.getAllUsers = getAllUsers;
const findOneUser = ({ query, projection = {} }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.findOne(query, projection);
    return result;
});
exports.findOneUser = findOneUser;
const findUserToUpdate = ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.equal) {
        Object.keys(query.equal).forEach((key) => {
            dbQuery[key] = {
                $eq: query.equal[key],
            };
        });
    }
    if (query.notEqual) {
        Object.keys(query.notEqual).forEach((key) => {
            dbQuery[key] = {
                $ne: query.notEqual[key],
            };
        });
    }
    const result = yield users_model_1.default.findOne(dbQuery);
    return result;
});
exports.findUserToUpdate = findUserToUpdate;
const updateUser = ({ query, content }) => __awaiter(void 0, void 0, void 0, function* () {
    // const options = { new: true };
    const result = yield users_model_1.default.findOneAndUpdate(query, content
    // options,
    );
    return result;
});
exports.updateUser = updateUser;
