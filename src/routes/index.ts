import express from 'express';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';
import { CategoryRoute } from '../api/category/routes';
import { BookRoute } from '../api/book/routes';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/categories', CategoryRoute);
router.use('/books', BookRoute);

export default router;
