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
const getBooksByCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await BookService.getBooksByCategory(id, req);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message:
                'Books with associated category data fetched successfully',
            meta: result.meta,
            data: result.data
        });
    }
);
const getSingleBook = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await BookService.getSingleBook(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Book fetched successfully',
            data: result
        });
    }
);
const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await BookService.updateBook(id, data);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book updated successfully',
        data: result
    });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.deleteBook(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book is deleted successfully',
        data: result
    });
});

export const BooksController = {
    createBook,
    getAllBook,
    getBooksByCategory,
    getSingleBook,
    updateBook,
    deleteBook
};
