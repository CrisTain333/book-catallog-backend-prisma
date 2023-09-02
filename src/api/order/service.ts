import { UserRole } from '../../enum/user';
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

export const OrderService = {
    createOrder,
    getAllOrders
};
