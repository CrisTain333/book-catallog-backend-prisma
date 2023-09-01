import express from 'express';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';
import { CategoryRoute } from '../api/category/routes';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/categories', CategoryRoute);

export default router;
