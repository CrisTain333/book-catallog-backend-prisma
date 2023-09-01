import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title Is Required'
        })
    })
});
const update = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title Is Required'
        })
    })
});

export const CategoryValidation = {
    create,
    update
};
