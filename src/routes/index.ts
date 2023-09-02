import express from 'express';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';
import { CategoryRoute } from '../api/category/routes';
import { BookRoute } from '../api/book/routes';
import { OrderRoute } from '../api/order/routes';
import { ProfileRoute } from '../api/profile/routes';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/categories', CategoryRoute);
router.use('/books', BookRoute);
router.use('/orders', OrderRoute);
router.use('/profile', ProfileRoute);

export default router;
