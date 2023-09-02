"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validate_1 = require("./validate");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(validate_1.authValidation.registerZodSchema), controller_1.AuthController.createUser);
router.post('/signin', (0, validateRequest_1.default)(validate_1.authValidation.LoginZodSchema), controller_1.AuthController.loginUser);
exports.AuthRoute = router;
