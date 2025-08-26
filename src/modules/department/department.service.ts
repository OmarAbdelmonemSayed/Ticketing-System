import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/CustomError';
import { hashPassword } from '../../utils/hashPassword';
import { createDepartmentType } from './dto/createDepartment.dto';
import { updateDepartmentType } from './dto/updateDepartment.dto';

const prisma = new PrismaClient();

const createNewDepartment = async (data: createDepartmentType) => {
    const department = await prisma.department.create({
        data
    });
    return department;
}

const getAllDepartments = async () => {
    const departments = await prisma.department.findMany();
    return departments;
}

const getDepartmentById = async (id: any) => {
    const department = await prisma.department.findFirst({
        where: {
            id
        },
        include: {
            User: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            },
            Ticket: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true
                }
            }
        }
    });
    if (!department) {
        throw new CustomError(404, 'Department not found')
    }
    return department;
}

const updateDepartmentById = async (id: any, data: updateDepartmentType) => {
    const department = await prisma.department.update({
        where: {
            id
        },
        data,
    });
    if (!department) {
        throw new CustomError(404, 'Department not found')
    }
    return department;
}

const deleteDepartmentById = async (id: any) => {
    const department = await prisma.department.findFirst({
        where: {
            id
        }
    });
    if (!department) {
        throw new CustomError(404, 'Department not found')
    }
    await prisma.department.delete({
        where: {
            id
        },
    });
}

export {
    createNewDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById
}