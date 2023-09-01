import { prisma } from '../../shared/prisma';
import { IBook } from './interface';

const createBook = async (data: IBook) => {
    const result = await prisma.book.create({
        data,
        select: {
            category: true
        }
    });

    return result;
};

export const BookService = {
    createBook
};
