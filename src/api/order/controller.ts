/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { OrderService } from './service';

const createOrder = catchAsync(async (req: any, res: Response) => {
    const user = req.user;
    const { ...data } = req.body;
    const result = await OrderService.createOrder(user, data);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order created successfully',
        data: result
    });
});
const getOrders = catchAsync(async (req: any, res: Response) => {
    const user = req.user;
    const result = await OrderService.getAllOrders(user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully',
        data: result
    });
});

const getSingleOrder = catchAsync(async (req: any, res: Response) => {
    const user = req.user;
    const orderId = req.params.orderId;
    const result = await OrderService.singleOrder(user, orderId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
});

export const OrderController = {
    createOrder,
    getOrders,
    getSingleOrder
};
