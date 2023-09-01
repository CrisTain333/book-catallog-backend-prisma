import express from 'express';
import { AuthRoute } from '../api/auth/routes';

const router = express.Router();

router.use('/auth', AuthRoute);

export default router;
