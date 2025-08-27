import { PrismaClient } from '@prisma/client';
import { UserRegister } from './dto/register.dto';
import bcrypt from 'bcryptjs';
import { UserLogin } from './dto/login.dto';
import { CustomError } from '../../utils/CustomError';
import { jwt } from 'zod';
import { hashPassword } from '../../utils/hashPassword';
import { UserResetPassword } from './dto/reset-password.dto';

const prisma = new PrismaClient();

const createUser = async (data: UserRegister) => {
    data.password = await hashPassword(data.password);
    const newUser = await prisma.user.create({
        data: {
            ...data,
            role: 'CUSTOMER'
        }
    });
    return newUser;
}

const findUserByEmailandPassword = async(data: UserLogin) => {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
            password: data.password
        }
    });
    if (!user) {
        throw new CustomError(400, "This user is not found")
    }
    return user;
}

const storeRefreshToken = async(user: any, refreshToken: any) => {
    await prisma.refresh_Tokens.deleteMany({
        where: {
            userId: user.id
        }
    })
    await prisma.refresh_Tokens.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // current time + 7 days (expires time)
        }
    })
}

const checkRefreshToken = async(refreshToken: any) => {
    const token = await prisma.refresh_Tokens.findFirst({
        where: {
            token: refreshToken
        }
    });
    if (!token) {
        throw new CustomError(400, "This refresh token is invalid");
    }
    if (token.expiresAt < new Date()) {
        await prisma.refresh_Tokens.deleteMany({
            where: {
                token: refreshToken
            }
        });
        throw new CustomError(400, "This refresh token is expired");
    }
}

const removeRefreshToken = async(refreshToken: any) => {
    await prisma.refresh_Tokens.deleteMany({
        where: {
            token: refreshToken
        }
    });
}

const findUserByEmail = async(email: any) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        throw new CustomError(400, "This user is not found")
    }
    return user;
}

const updateUserNewPassword = async(data: any, newPassowrd: string) => {
    newPassowrd = await hashPassword(newPassowrd);
    const user = prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            password: newPassowrd
        }
    });
    if (!user) {
        throw new CustomError(400, "This user is not found");
    }
    return user;
}

export {
    createUser,
    findUserByEmailandPassword,
    storeRefreshToken,
    checkRefreshToken,
    removeRefreshToken,
    findUserByEmail,
    updateUserNewPassword
}