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
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUser = void 0;
const users_model_1 = __importDefault(require("../users/users.model"));
const findUser = ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.findOne(query);
    return result;
});
exports.findUser = findUser;
const createUser = ({ content }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.create(content);
    return result;
});
exports.createUser = createUser;
const updateUser = ({ query, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true };
    const result = yield users_model_1.default.findOneAndUpdate(query, content, options);
    return result;
});
exports.updateUser = updateUser;
const deleteUser = ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.default.deleteMany(query);
});
exports.deleteUser = deleteUser;
