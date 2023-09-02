/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type IApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    data?: T | null;
    meta?: any;
    token?: string | null;
};

const sendResponse = <T>(
    res: Response,
    data: IApiResponse<T>
): void => {
    const responseData = {
        statusCode: data?.statusCode,
        success: data?.success,
        message: data?.message || null,
        meta: data?.meta || null || undefined,
        data: data?.data || null,
        token: data?.token || null
    };

    res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
