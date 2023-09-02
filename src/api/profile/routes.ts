import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
import { ProfileController } from './controller';
const router = express.Router();

router.get(
    '/',
    auth(UserRole.ADMIN, UserRole.CUSTOMER),
    ProfileController.getProfile
);

export const ProfileRoute = router;
