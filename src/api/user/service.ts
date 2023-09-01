// import { JwtPayload } from 'jsonwebtoken';
// import ApiError from '../../error/ApiError';
// import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/prisma';

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

// const getUser = async (user: JwtPayload): Promise<IUser | null> => {
//     const { email } = user;
//     const profile = await User.findOne({ email });
//     if (!profile) {
//         throw new ApiError(httpCode.NOT_FOUND, 'User not found');
//     }

//     const userWithoutPassword = await User.findById(
//         profile._id
//     ).select('-password');

//     return userWithoutPassword;
// };

export const UserService = {
    getAllUsers
};
