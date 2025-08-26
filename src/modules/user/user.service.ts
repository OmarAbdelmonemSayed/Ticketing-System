import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/CustomError';
import { hashPassword } from '../../utils/hashPassword';
import { CreateUserType } from './dto/createUser.dto';
import { UpdateUserType } from './dto/updateUser.dto';

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
            department: {
                select: {
                    id: true,
                    name: true
                }
            }
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
            role: true,
            department: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    if (!user) {
        throw new CustomError(400, "User not found");
    }
    return user;
}

const updateUserById = async (id: any, data: any) => {
    let user: any = await prisma.user.findFirst({
        where: {
            id
        }
    })
    if (!user) {
        throw new CustomError(400, "User not found");
    }
    console.log(data.departmentId, user.role);
    if (user.role != 'AGENT' && data.departmentId) {
        throw new CustomError(400, "Only Agents can be assigned to a department");
    }
    if (data.departmentId) {
        const department = await prisma.department.findFirst({
            where: {
                id: data.departmentId
            }
        });
        if (!department) {
            throw new CustomError(404, "Department not found");
        }
    }
    user = await prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            department: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return user;
}

const deleteUserById = async (id: any) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        }
    });
    if (!user) {
        throw new CustomError(404, 'User not found');
    }
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