// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { Request } from 'express';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './service';
import sendResponse from '../../shared/sendResponse';

const getAllUsers = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.getAllUsers();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `User's retrieved successfully`,
            data: result
        });
    }
);
const getSingleUser = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await UserService.getSingleUser(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User retrieved successfully',
            data: result
        });
    }
);
const updateUserIntoDb = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const { ...data } = req.body;
        const result = await UserService.updateUser(id, data);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User updated successfully',
            data: result
        });
    }
);
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result
    });
});

export const UserController = {
    getAllUsers,
    getSingleUser,
    updateUserIntoDb,
    deleteUser
};
