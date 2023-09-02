"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enum/user");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(user_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(validation_1.OrderValidation.createOrderZodSchema), controller_1.OrderController.createOrder);
router.get('/:orderId', (0, auth_1.default)(user_1.UserRole.ADMIN, user_1.UserRole.CUSTOMER), controller_1.OrderController.getSingleOrder);
router.get('/', (0, auth_1.default)(user_1.UserRole.ADMIN, user_1.UserRole.CUSTOMER), controller_1.OrderController.getOrders);
exports.OrderRoute = router;
