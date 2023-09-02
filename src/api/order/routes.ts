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

router.get(
    '/:orderId',
    auth(UserRole.ADMIN, UserRole.CUSTOMER),
    OrderController.getSingleOrder
);

router.get(
    '/',
    auth(UserRole.ADMIN, UserRole.CUSTOMER),
    OrderController.getOrders
);

export const OrderRoute = router;
