/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { prisma } from '../../shared/prisma';
import { IBook } from './interface';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';

const createBook = async (data: IBook) => {
    const result = await prisma.book.create({
        data,
        include: {
            category: true
        }
    });

    return result;
};

const getAllBooks = async (req: Request) => {
    const {
        page = 1,
        size = 10,
        sortBy = 'title',
        sortOrder = 'asc',
        minPrice,
        maxPrice,
        category,
        search
    }: any = req.query;

    try {
        // Define the Prisma query object
        const query: any = {
            skip: (parseInt(page) - 1) * parseInt(size),
            take: parseInt(size),
            orderBy: {
                [sortBy]: sortOrder as 'asc' | 'desc' // Ensure sortOrder is of the correct type
            },
            where: {
                price: {
                    gte: minPrice
                        ? parseFloat(minPrice as string)
                        : undefined,
                    lte: maxPrice
                        ? parseFloat(maxPrice as string)
                        : undefined
                },
                categoryId: category
                    ? (category as string)
                    : undefined,
                OR: search
                    ? [
                          {
                              title: {
                                  contains: search as string,
                                  mode: 'insensitive' // Case-insensitive search
                              }
                          },
                          {
                              author: {
                                  contains: search as string,
                                  mode: 'insensitive'
                              }
                          },
                          {
                              genre: {
                                  contains: search as string,
                                  mode: 'insensitive'
                              }
                          }
                      ]
                    : undefined
            }
        };

        // Query the database
        const books = await prisma.book.findMany(query);

        // Calculate total pages based on the total count and page size
        const totalCount = await prisma.book.count({
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
    } catch (error) {
        throw new ApiError(
            httpCode.INTERNAL_SERVER_ERROR,
            'Error fetching books'
        );
    }
};

const getBooksByCategory = async (
    categoryId: string,
    req: Request
) => {
    const { page = 1, size = 10 }: any = req.query;

    const books = await prisma.book.findMany({
        skip: (parseInt(page) - 1) * parseInt(size),
        take: parseInt(size),
        where: {
            categoryId: categoryId
                ? (categoryId as string)
                : undefined
        }
    });

    // Calculate total pages based on the total count and page size
    const totalCount = await prisma.book.count({
        where: {
            categoryId: categoryId
                ? (categoryId as string)
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
};

const getSingleBook = async (id: string) => {
    const result = await prisma.book.findUnique({
        where: { id }
    });

    if (!result) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Book not found');
    }
    return result;
};

const updateBook = async (id: string, data: Partial<IBook>) => {
    try {
        const result = await prisma.book.update({
            where: {
                id: id
            },
            data
        });

        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid Book Id');
    }
};

const deleteBook = async (id: string) => {
    try {
        const result = await prisma.book.delete({
            where: {
                id: id
            }
        });

        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid Book Id');
    }
};

export const BookService = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getSingleBook,
    updateBook,
    deleteBook
};
