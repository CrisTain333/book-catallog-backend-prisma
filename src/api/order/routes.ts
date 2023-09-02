import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../../enum/user';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './validation';
import { OrderController } from './controller';
const router = express.Router();

router.post(
    '/create-order',
    auth(UserRole.CUSTOMER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
);

export const OrderRoute = router;
