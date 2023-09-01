import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthService } from './service';
import sendResponse from '../../shared/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const { ...registerData } = req.body;
    const result = await AuthService.createUser(registerData);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: result
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User login in successfully',
        data: { token: result.accessToken }
    });
});

export const AuthController = {
    loginUser,
    createUser
};
