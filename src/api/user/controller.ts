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
            message: 'User retrieved successfully',
            data: result
        });
    }
);

export const UserController = { getAllUsers };
