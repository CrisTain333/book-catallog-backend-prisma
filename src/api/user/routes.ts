import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
const router = express.Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUsers);

export const UserRoute = router;
