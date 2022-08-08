"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.createToken = void 0;
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const var_1 = __importDefault(require("../../config/var"));
const opts = {
    secretOrKey: var_1.default.jwtSecretKey,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        confirmationLevel: user.confirmationLevel,
        isAdmin: user.isAdmin,
    }, opts.secretOrKey);
};
exports.createToken = createToken;
const verify = (token, done) => {
    if (token._id && token.confirmationLevel && token.isAdmin !== undefined) {
        done(null, token);
    }
    else {
        done(null, false);
    }
};
exports.verify = verify;
exports.default = new passport_jwt_1.Strategy(opts, exports.verify);
