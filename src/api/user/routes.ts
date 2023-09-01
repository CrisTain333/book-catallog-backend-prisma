import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './validate';
const router = express.Router();

router.delete(
    '/:id',
    auth(UserRole.ADMIN),
    UserController.deleteUser
);

router.patch(
    '/:id',
    auth(UserRole.ADMIN),
    validateRequest(UserValidation.userUpdateZodSchema),
    UserController.updateUserIntoDb
);
router.get(
    '/:id',
    auth(UserRole.ADMIN),
    UserController.getSingleUser
);
router.get('/', auth(UserRole.ADMIN), UserController.getAllUsers);

export const UserRoute = router;
