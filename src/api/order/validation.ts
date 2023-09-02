import { z } from 'zod';

const orderedBookSchema = z.object({
    bookId: z.string(),
    quantity: z.number().positive()
});

const createOrderZodSchema = z.object({
    body: z.object({
        orderedBooks: z.array(orderedBookSchema)
    })
});

export const OrderValidation = {
    createOrderZodSchema
};
