import { z } from 'zod';

const createBookSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title required'
        }),
        author: z.string({
            required_error: 'author required'
        }),
        genre: z.string({
            required_error: 'genre required'
        }),
        price: z.number({
            required_error: 'price required'
        }),
        publicationDate: z.string({
            required_error: 'publicationDate required'
        }),
        categoryId: z.string({
            required_error: 'categoryId required'
        })
    })
});

export const BookValidator = {
    createBookSchema
};
