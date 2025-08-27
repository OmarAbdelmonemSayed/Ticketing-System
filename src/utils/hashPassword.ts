import bcrypt from 'bcryptjs';

const hashPassword = async (password: String) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password as string, salt);
}

export {
    hashPassword
}