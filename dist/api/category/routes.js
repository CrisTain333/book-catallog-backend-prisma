"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../enum/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(user_1.UserRole.ADMIN), (0, validateRequest_1.default)(validation_1.CategoryValidation.create), controller_1.CategoryController.createCategory);
router.patch('/:id', (0, auth_1.default)(user_1.UserRole.ADMIN), (0, validateRequest_1.default)(validation_1.CategoryValidation.update), controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(user_1.UserRole.ADMIN), controller_1.CategoryController.deleteCategory);
router.get('/:id', controller_1.CategoryController.getSingleCategory);
router.get('/', controller_1.CategoryController.getAllCategory);
exports.CategoryRoute = router;
