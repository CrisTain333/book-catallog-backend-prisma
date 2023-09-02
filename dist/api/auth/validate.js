"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const LoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
const registerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required'
        }),
        role: zod_1.z.string({
            required_error: 'Role is required'
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required'
        }),
        address: zod_1.z.string({
            required_error: 'Address is required'
        }),
        profileImg: zod_1.z.string({
            required_error: 'Profile Image is required'
        })
    })
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required'
        })
    })
});
exports.authValidation = {
    LoginZodSchema,
    registerZodSchema,
    refreshTokenZodSchema
};
