import express from 'express';
import { BooksController } from './controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
import validateRequest from '../../middleware/validateRequest';
import { BookValidator } from './validation';
const routes = express.Router();

routes.post(
    '/create-book',
    auth(UserRole.ADMIN),
    validateRequest(BookValidator.createBookSchema),
    BooksController.createBook
);

export const BookRoute = routes;
