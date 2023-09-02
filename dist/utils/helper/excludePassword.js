"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludePassword = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
function excludePassword(user) {
    delete user.password;
    return user;
}
exports.excludePassword = excludePassword;
