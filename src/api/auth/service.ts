/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { jwtHelpers } from '../../utils/helper/jwtHelpers';
// import { User } from '../user/model';
import { ILoginUser } from './interface';
import bcrypt from 'bcrypt';
import { IUser } from '../user/interface';
import { prisma } from '../../shared/prisma';
import { hashPassword } from '../../utils/helper/hasPassword';
import { excludePassword } from '../../utils/helper/excludePassword';

const createUser = async (data: any): Promise<IUser | null> => {
    // eslint-disable-next-line prefer-const
    let { email, password } = data;

    //Check the email exist in database or not ;
    const isExits = await prisma.user.findUnique({
        where: { email }
    });

    if (isExits) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Email already exists'
        );
    }

    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;

    const result = await prisma.user.create({ data });
    const userWithoutPassword = excludePassword(result);
    return userWithoutPassword;

    // return userWithoutPassword;
};

const login = async (payload: ILoginUser) => {
    const { email: userEmail, password } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: { email: userEmail }
    });

    // check the email exist
    if (!isUserExist) {
        throw new ApiError(httpCode.NOT_FOUND, 'User does not exist');
    }

    // check the password
    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist?.password
    );

    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError(
            httpCode.UNAUTHORIZED,
            'Invalid credentials'
        );
    }

    const { role, id } = isUserExist;

    // if matched created
    const accessToken = jwtHelpers.createToken(
        { role, id },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken
    };
};

export const AuthService = { createUser, login };
