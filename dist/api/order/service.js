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
exports.OrderService = void 0;
const user_1 = require("../../enum/user");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const prisma_1 = require("../../shared/prisma");
/* eslint-disable @typescript-eslint/no-explicit-any */
const createOrder = (user, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = orderData;
    const { id } = user;
    const result = yield prisma_1.prisma.order.create({
        data: {
            userId: id,
            orderedBooks
        }
    });
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === user_1.UserRole.ADMIN) {
        const result = yield prisma_1.prisma.order.findMany({});
        return result;
    }
    else {
        const result = yield prisma_1.prisma.order.findMany({
            where: {
                userId: user.id
            }
        });
        return result;
    }
});
const singleOrder = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || id === undefined || id === null || id === '') {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Order Id is required');
    }
    if (user.role === user_1.UserRole.ADMIN) {
        const result = yield prisma_1.prisma.order.findUnique({
            where: {
                id: id
            }
        });
        if (!result) {
            throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid Order Id');
        }
        return result;
    }
    else {
        const result = yield prisma_1.prisma.order.findUnique({
            where: {
                id: id
            }
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) !== user.id) {
            throw new ApiError_1.default(httpCodes_1.httpCode.FORBIDDEN, `You Don't have permission to access this order`);
        }
        else {
            return result;
        }
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    singleOrder
};
