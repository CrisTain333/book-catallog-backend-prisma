"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enum/user");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validate_1 = require("./validate");
const router = express_1.default.Router();
router.delete('/:id', (0, auth_1.default)(user_1.UserRole.ADMIN), controller_1.UserController.deleteUser);
router.patch('/:id', (0, auth_1.default)(user_1.UserRole.ADMIN), (0, validateRequest_1.default)(validate_1.UserValidation.userUpdateZodSchema), controller_1.UserController.updateUserIntoDb);
router.get('/:id', (0, auth_1.default)(user_1.UserRole.ADMIN), controller_1.UserController.getSingleUser);
router.get('/', (0, auth_1.default)(user_1.UserRole.ADMIN), controller_1.UserController.getAllUsers);
exports.UserRoute = router;
