import { z } from 'zod';

export type IUser = {
    name: string;
    email: string;
    password: string;
    role: string;
    contactNo: string;
    address: string;
    profileImg: string;
};

const userUpdateZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        profileImg: z.string().optional()
    })
});

export const UserValidation = {
    userUpdateZodSchema
};
