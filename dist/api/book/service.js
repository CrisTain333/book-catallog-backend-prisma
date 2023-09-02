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
exports.BookService = void 0;
const prisma_1 = require("../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.create({
        data,
        include: {
            category: true
        }
    });
    return result;
});
const getAllBooks = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, size = 10, sortBy = 'title', sortOrder = 'asc', minPrice, maxPrice, category, search } = req.query;
    try {
        // Define the Prisma query object
        const query = {
            skip: (parseInt(page) - 1) * parseInt(size),
            take: parseInt(size),
            orderBy: {
                [sortBy]: sortOrder // Ensure sortOrder is of the correct type
            },
            where: {
                price: {
                    gte: minPrice
                        ? parseFloat(minPrice)
                        : undefined,
                    lte: maxPrice
                        ? parseFloat(maxPrice)
                        : undefined
                },
                categoryId: category
                    ? category
                    : undefined,
                OR: search
                    ? [
                        {
                            title: {
                                contains: search,
                                mode: 'insensitive' // Case-insensitive search
                            }
                        },
                        {
                            author: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            genre: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    ]
                    : undefined
            }
        };
        // Query the database
        const books = yield prisma_1.prisma.book.findMany(query);
        // Calculate total pages based on the total count and page size
        const totalCount = yield prisma_1.prisma.book.count({
            where: query.where
        });
        const totalPage = Math.ceil(totalCount / parseInt(size));
        // Return the result as JSON
        return {
            meta: {
                page: parseInt(page),
                size: parseInt(size),
                total: totalCount,
                totalPage
            },
            data: books
        };
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.INTERNAL_SERVER_ERROR, 'Error fetching books');
    }
});
const getBooksByCategory = (categoryId, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, size = 10 } = req.query;
    const books = yield prisma_1.prisma.book.findMany({
        skip: (parseInt(page) - 1) * parseInt(size),
        take: parseInt(size),
        where: {
            categoryId: categoryId
                ? categoryId
                : undefined
        }
    });
    // Calculate total pages based on the total count and page size
    const totalCount = yield prisma_1.prisma.book.count({
        where: {
            categoryId: categoryId
                ? categoryId
                : undefined
        }
    });
    const totalPage = Math.ceil(totalCount / parseInt(size));
    // Return the result as JSON
    return {
        meta: {
            page: parseInt(page),
            size: parseInt(size),
            total: totalCount,
            totalPage
        },
        data: books
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: { id }
    });
    if (!result) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Book not found');
    }
    return result;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.update({
            where: {
                id: id
            },
            data
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid Book Id');
    }
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.delete({
            where: {
                id: id
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid Book Id');
    }
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getSingleBook,
    updateBook,
    deleteBook
};
