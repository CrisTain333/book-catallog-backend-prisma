import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/prisma';

/* eslint-disable @typescript-eslint/no-explicit-any */
const createCategory = async (data: any) => {
    const result = await prisma.category.create({ data });
    return result;
};

const getAllCategory = async () => {
    const result = await prisma.category.findMany({});
    return result;
};

const getSingleCategoryWithBooks = async (id: string) => {
    const result = await prisma.category.findUnique({
        where: {
            id: id
        },
        include: {
            books: true
        }
    });

    if (!result) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Invalid Category ID'
        );
    }

    return result;
};

const updateCategory = async (
    id: string,
    data: { title: string }
) => {
    try {
        const result = await prisma.category.update({
            where: {
                id: id
            },
            data
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Invalid Category Id'
        );
    }
};

const deleteCategory = async (id: string) => {
    try {
        const result = await prisma.category.delete({
            where: {
                id: id
            }
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Invalid Category Id'
        );
    }
};

export const CategoryService = {
    createCategory,
    getAllCategory,
    getSingleCategoryWithBooks,
    updateCategory,
    deleteCategory
};
