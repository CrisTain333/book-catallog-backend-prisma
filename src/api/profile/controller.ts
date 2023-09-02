/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { ProfileService } from './service';
import sendResponse from '../../shared/sendResponse';

const getProfile = catchAsync(async (req: any, res: Response) => {
    const user = req.user;
    const result = await ProfileService.getProfileFromDb(user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Profile retrieved successfully',
        data: result
    });
});

export const ProfileController = {
    getProfile
};
