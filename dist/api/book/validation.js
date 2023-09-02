"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidator = void 0;
const zod_1 = require("zod");
const createBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title required'
        }),
        author: zod_1.z.string({
            required_error: 'author required'
        }),
        genre: zod_1.z.string({
            required_error: 'genre required'
        }),
        price: zod_1.z.number({
            required_error: 'price required'
        }),
        publicationDate: zod_1.z.string({
            required_error: 'publicationDate required'
        }),
        categoryId: zod_1.z.string({
            required_error: 'categoryId required'
        })
    })
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        price: zod_1.z.number().optional()
    })
});
exports.BookValidator = {
    createBookSchema,
    updateBookZodSchema
};
