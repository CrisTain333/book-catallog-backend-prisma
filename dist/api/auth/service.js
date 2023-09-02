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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const jwtHelpers_1 = require("../../utils/helper/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../shared/prisma");
const hasPassword_1 = require("../../utils/helper/hasPassword");
const excludePassword_1 = require("../../utils/helper/excludePassword");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line prefer-const
    let { email, password } = data;
    //Check the email exist in database or not ;
    const isExits = yield prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (isExits) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Email already exists');
    }
    const hashedPassword = yield (0, hasPassword_1.hashPassword)(password);
    data.password = hashedPassword;
    const result = yield prisma_1.prisma.user.create({ data });
    const userWithoutPassword = (0, excludePassword_1.excludePassword)(result);
    return userWithoutPassword;
    // return userWithoutPassword;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: { email: userEmail }
    });
    // check the email exist
    if (!isUserExist) {
        throw new ApiError_1.default(httpCodes_1.httpCode.NOT_FOUND, 'User does not exist');
    }
    // check the password
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError_1.default(httpCodes_1.httpCode.UNAUTHORIZED, 'Invalid credentials');
    }
    const { role, id } = isUserExist;
    // if matched created
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ role, id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken
    };
});
exports.AuthService = { createUser, login };
