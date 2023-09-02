import { prisma } from '../../shared/prisma';

/* eslint-disable @typescript-eslint/no-explicit-any */
const createOrder = async (user: any, orderData: any) => {
    const { id } = user;

    const result = await prisma.order.create({
        data: {
            userId: id,
            orderedBooks: orderData
        }
    });

    return result;
};

export const OrderService = {
    createOrder
};
