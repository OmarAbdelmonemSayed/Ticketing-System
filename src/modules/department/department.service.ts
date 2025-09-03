import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/CustomError';
import { hashPassword } from '../../utils/hashPassword';
import { CreateDepartmentType } from './dto/createDepartment.dto';
import { UpdateDepartmentType } from './dto/updateDepartment.dto';

const prisma = new PrismaClient();

const createNewDepartment = async (data: CreateDepartmentType) => {
    const department = await prisma.department.create({
        data
    });
    return department;
}

const getAllDepartments = async () => {
    const departments = await prisma.department.findMany();
    return departments;
}

const getAllDepartmentsNames = async () => {
    const departments = await prisma.department.findMany({
        select: {
            name: true,
            description: true
        }
    });
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

const updateDepartmentById = async (id: any, data: UpdateDepartmentType) => {
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

const getAllUsersInDepartment = async (departmentName: any) => {
    const users = await prisma.department.findFirst({
        where: {
            name: departmentName
        },
        select: {
            id: true,
            name: true,
            description: true,
            User: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    assignedTickets: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    });
    return users;
}

export {
    createNewDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
    getAllDepartmentsNames,
    getAllUsersInDepartment
}