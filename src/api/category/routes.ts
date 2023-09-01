import express from 'express';
import { UserRole } from '../../enum/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CategoryValidation } from './validation';
import { CategoryController } from './controller';
const router = express.Router();

router.post(
    '/create-category',
    auth(UserRole.ADMIN),
    validateRequest(CategoryValidation.create),
    CategoryController.createCategory
);
router.patch(
    '/:id',
    auth(UserRole.ADMIN),
    validateRequest(CategoryValidation.update),
    CategoryController.updateCategory
);
router.delete(
    '/:id',
    auth(UserRole.ADMIN),
    CategoryController.deleteCategory
);
router.get('/:id', CategoryController.getSingleCategory);
router.get('/', CategoryController.getAllCategory);

export const CategoryRoute = router;
