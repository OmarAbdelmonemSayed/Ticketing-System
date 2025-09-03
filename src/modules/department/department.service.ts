import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/CustomError';
import { CreateDepartmentType } from './dto/createDepartment.dto';
import { UpdateDepartmentType } from './dto/updateDepartment.dto';
import { getAllTickets } from '../ticket/ticket.service';

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

const getDepartmentsAnalytics = async () => {
    const data = await prisma.department.findMany({
        select: {
            id: true,
            name: true,
            User: {
                select: {
                    id: true
                }
            },
            Ticket: {
                select: {
                    priority: true
                }
            }
        }
    });
    let report: any[] = [];
    let ticketsAssignedToDepartment = 0;
    for (let i = 0; i < data.length; i++) {
        let reportElement: any = {};
        reportElement.departmentId = data[i].id;
        reportElement.departmentName = data[i].name;
        reportElement.numberOfAgents = data[i].User.length;
        reportElement.numberOfTickets = data[i].Ticket.length;
        const lowTickets = data[i].Ticket.filter((ticket) => ticket.priority === 'LOW');
        const mediumTickets = data[i].Ticket.filter((ticket) => ticket.priority === 'MEDIUM');
        const highTickets = data[i].Ticket.filter((ticket) => ticket.priority === 'HIGH');
        const urgentTickets = data[i].Ticket.filter((ticket) => ticket.priority === 'URGENT');
        reportElement.numberOfLowPriorityTickets = lowTickets.length;
        reportElement.numberOfMediumPriorityTickets = mediumTickets.length;
        reportElement.numberOfHighPriorityTickets = highTickets.length;
        reportElement.numberOfUrgentPriorityTickets = urgentTickets.length;
        ticketsAssignedToDepartment += reportElement.numberOfTickets;
        report.push(reportElement);
    }
    const tickets = await getAllTickets({role: 'ADMIN'});
    let reportElement: any = {};
    reportElement.departmentName = 'OTHERS';
    reportElement.numberOfTickets = tickets.length - ticketsAssignedToDepartment;
    report.push(reportElement);
    return report;
}

export {
    createNewDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
    getAllDepartmentsNames,
    getAllUsersInDepartment,
    getDepartmentsAnalytics
}