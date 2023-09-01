import { z } from 'zod';

const LoginZodSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email(),
        password: z.string({
            required_error: 'Password is required'
        })
    })
});

const registerZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email(),
        password: z.string({
            required_error: 'Password is required'
        }),
        role: z.string({
            required_error: 'Role is required'
        }),
        contactNo: z.string({
            required_error: 'Contact Number is required'
        }),
        address: z.string({
            required_error: 'Address is required'
        }),
        profileImg: z.string({
            required_error: 'Profile Image is required'
        })
    })
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required'
        })
    })
});

export const authValidation = {
    LoginZodSchema,
    registerZodSchema,
    refreshTokenZodSchema
};
