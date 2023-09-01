import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { CategoryService } from './service';

const createCategory = catchAsync(
    async (req: Request, res: Response) => {
        const { ...data } = req.body;
        const result = await CategoryService.createCategory(data);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category created successfully',
            data: result
        });
    }
);

const getSingleCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result =
            await CategoryService.getSingleCategoryWithBooks(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category fetched successfully',
            data: result
        });
    }
);

const getAllCategory = catchAsync(
    async (req: Request, res: Response) => {
        const result = await CategoryService.getAllCategory();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Categories fetched successfully',
            data: result
        });
    }
);

const updateCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        const result = await CategoryService.updateCategory(id, data);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category updated successfully',
            data: result
        });
    }
);

const deleteCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await CategoryService.deleteCategory(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category deleted successfully',
            data: result
        });
    }
);

export const CategoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
};
