import express from 'express';
import { BooksController } from './controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
import validateRequest from '../../middleware/validateRequest';
import { BookValidator } from './validation';
const router = express.Router();

router.post(
    '/create-book',
    auth(UserRole.ADMIN),
    validateRequest(BookValidator.createBookSchema),
    BooksController.createBook
);

router.patch(
    '/:id',
    auth(UserRole.ADMIN),
    validateRequest(BookValidator.updateBookZodSchema),
    BooksController.updateBook
);

router.delete(
    '/:id',
    auth(UserRole.ADMIN),
    BooksController.deleteBook
);

router.get('/', BooksController.getAllBook);
router.get('/:id/category', BooksController.getBooksByCategory);
router.get('/:id', BooksController.getSingleBook);

export const BookRoute = router;
