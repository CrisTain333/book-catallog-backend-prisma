import { UserRole } from '../../enum/user';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/prisma';

/* eslint-disable @typescript-eslint/no-explicit-any */
const createOrder = async (user: any, orderData: any) => {
    const { orderedBooks } = orderData;
    const { id } = user;

    const result = await prisma.order.create({
        data: {
            userId: id,
            orderedBooks
        }
    });

    return result;
};

const getAllOrders = async (user: any) => {
    if (user.role === UserRole.ADMIN) {
        const result = await prisma.order.findMany({});
        return result;
    } else {
        const result = await prisma.order.findMany({
            where: {
                userId: user.id
            }
        });

        return result;
    }
};

const singleOrder = async (user: any, id: string) => {
    if (!id || id === undefined || id === null || id === '') {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Order Id is required'
        );
    }

    if (user.role === UserRole.ADMIN) {
        const result = await prisma.order.findUnique({
            where: {
                id: id
            }
        });

        if (!result) {
            throw new ApiError(
                httpCode.BAD_REQUEST,
                'Invalid Order Id'
            );
        }
        return result;
    } else {
        const result = await prisma.order.findUnique({
            where: {
                id: id
            }
        });

        if (result?.userId !== user.id) {
            throw new ApiError(
                httpCode.FORBIDDEN,
                `You Don't have permission to access this order`
            );
        } else {
            return result;
        }
    }
};

export const OrderService = {
    createOrder,
    getAllOrders,
    singleOrder
};
