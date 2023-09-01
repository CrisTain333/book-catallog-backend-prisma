/* eslint-disable @typescript-eslint/no-explicit-any */
export function excludePassword(user: any) {
    delete user.password;
    return user;
}
