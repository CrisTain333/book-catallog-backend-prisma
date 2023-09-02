import { prisma } from '../../shared/prisma';

/* eslint-disable @typescript-eslint/no-explicit-any */
const getProfileFromDb = async (user: any) => {
    const profile = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });
    return profile;
};

export const ProfileService = {
    getProfileFromDb
};
