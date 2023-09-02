import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { BookService } from './service';
import sendResponse from '../../shared/sendResponse';

const createBook = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await BookService.createBook(data);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book created successfully',
        data: result
    });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.getAllBooks(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book created successfully',
        meta: result.meta,
        data: result.data
    });
});

export const BooksController = {
    createBook,
    getAllBook
};
