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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JwtPayload } from 'jsonwebtoken';
const httpCodes_1 = require("../../shared/httpCodes");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = require("../../shared/prisma");
const excludePassword_1 = require("../../utils/helper/excludePassword");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield prisma_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
            address: true,
            role: true,
            profileImg: true
        }
    });
    return Users;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield prisma_1.prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
            address: true,
            role: true,
            profileImg: true
        }
    });
    if (!User) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid User ID');
    }
    return User;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma_1.prisma.user.update({
        where: { id },
        data: data
    });
    if (!updatedUser) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid User ID');
    }
    const userWithoutPassword = (0, excludePassword_1.excludePassword)(updatedUser);
    return userWithoutPassword;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield prisma_1.prisma.user.delete({
        where: {
            id
        }
    });
    if (!User) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid User ID');
    }
    return User;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
