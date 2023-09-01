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

export const BooksController = {
    createBook
};
