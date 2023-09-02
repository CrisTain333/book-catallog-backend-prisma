"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enum/user");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.UserRole.ADMIN, user_1.UserRole.CUSTOMER), controller_1.ProfileController.getProfile);
exports.ProfileRoute = router;
