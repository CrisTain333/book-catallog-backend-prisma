// Import bcrypt module
import * as bcrypt from 'bcrypt';
import config from '../../config';

// Define a function that takes a string as input and returns a hashed password
export const hashPassword = async (
    password: string
): Promise<string> => {
    const hashed = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds)
    );
    // Return the hashed password as a string
    return hashed;
};
