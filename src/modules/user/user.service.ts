import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/CustomError';
import { hashPassword } from '../../utils/hashPassword';
import { CreateUserType } from './dto/createUser.dto';

const prisma = new PrismaClient();

const createNewUser = async (data: CreateUserType) => {
    data.password = await hashPassword(data.password);
    const newUser = await prisma.user.create({
        data
    });
    return newUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
        }
    });
    return users;
}

const getUserById = async (id: any) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    })
    if (!user) {
        throw new CustomError(400, "User not found");
    }
    return user;
}

const updateUserById = async (id: any, data: any) => {
    const user = prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true   
        }
    });
    if (!user) {
        throw new CustomError(400, "User not found");
    }
    return user;
}

const deleteUserById = async (id: any) => {
    await prisma.user.delete({
        where: {
            id
        }
    });
}

export {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}