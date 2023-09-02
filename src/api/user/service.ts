/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JwtPayload } from 'jsonwebtoken';
import { httpCode } from '../../shared/httpCodes';
import ApiError from '../../error/ApiError';
import { prisma } from '../../shared/prisma';
import { IUser } from './interface';
import { excludePassword } from '../../utils/helper/excludePassword';

const getAllUsers = async () => {
    const Users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
            address: true,
            role: true,
            profileImg: true
        }
    });

    return Users;
};

const getSingleUser = async (id: string) => {
    const User = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
            address: true,
            role: true,
            profileImg: true
        }
    });

    if (!User) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid User ID');
    }
    return User;
};

const updateUser = async (id: string, data: Partial<IUser>) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: data
    });

    if (!updatedUser) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid User ID');
    }

    const userWithoutPassword = excludePassword(updatedUser);
    return userWithoutPassword;
};

const deleteUser = async (id: string) => {
    const User = await prisma.user.delete({
        where: {
            id
        }
    });

    if (!User) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid User ID');
    }

    return User;
};

export const UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
