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
exports.deleteTicket = exports.addNewTicket = exports.getAllTickets = void 0;
const tickets_model_1 = __importDefault(require("./tickets.model"));
const getAllTickets = (query, projection) => __awaiter(void 0, void 0, void 0, function* () {
    const dbQuery = {};
    if (query.name) {
        dbQuery.name = {
            $regex: query.name,
            $options: 'i',
        };
    }
    const ticket = yield tickets_model_1.default.find(dbQuery, projection);
    return ticket;
});
exports.getAllTickets = getAllTickets;
const addNewTicket = (ticket) => __awaiter(void 0, void 0, void 0, function* () {
    const newTicket = yield tickets_model_1.default.create(ticket);
    return newTicket;
});
exports.addNewTicket = addNewTicket;
const deleteTicket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield tickets_model_1.default.findByIdAndRemove(id);
    return ticket;
});
exports.deleteTicket = deleteTicket;
