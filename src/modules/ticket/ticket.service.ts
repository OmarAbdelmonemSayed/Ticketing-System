import { CustomError } from "./../../utils/CustomError";
import { CreateTicketType } from "./dto/createTicket.dto"
import { PrismaClient } from "@prisma/client";
import { UpdateTicketType } from "./dto/updateTicket.dto";
import { UpdateStatusType } from "./dto/updateStatus.dto";
import { CreateAttachmentType } from "../attachment/dto/createAttachment.dto";

const prisma = new PrismaClient();

const createNewTicket = async (data: CreateTicketType, customerId: any) => {
    const ticket = prisma.ticket.create({
        data: {
            ...data,
            customerId
        }
    });
    return ticket;
}

const getAllTickets = async (data: any) => {
    let tickets;
    if (data.role === 'CUSTOMER') {
        tickets = await prisma.ticket.findMany({
            where: {
                customerId: data.id
            }
        });
    } else if (data.role === 'AGENT') {
        tickets = await prisma.ticket.findMany({
            where: {
                agentId: data.id
            }
        });
    } else {
        tickets = await prisma.ticket.findMany();
    }
    return tickets;
}

const getTicketById = async (user: any, id: any) => {
    let ticket;
    if (user.role === 'CUSTOMER') {
        ticket = await prisma.ticket.findFirst({
            where: {
                id,
                customerId: user.id
            },
            include: {
                Comment: {
                    select: {
                        id: true,
                        body : true,
                        userId: true,
                        createdAt: true,
                        Attachment: {
                            omit: {
                                commentId: true
                            }
                        }
                    },
                }
            }
        });
    } else if (user.role === 'AGENT') {
        ticket = await prisma.ticket.findFirst({
            where: {
                id,
                agentId: user.id
            },
            include: {
                Comment: {
                    select: {
                        id: true,
                        body : true,
                        userId: true,
                        createdAt: true,
                        Attachment: {
                            omit: {
                                commentId: true
                            }
                        }
                    },
                }
            }
        });
    } else if (user.role === 'ADMIN') {
        ticket = await prisma.ticket.findFirst({
            where: {
                id
            },
            include: {
                Comment: {
                    select: {
                        id: true,
                        body : true,
                        userId: true,
                        createdAt: true,
                        Attachment: {
                            omit: {
                                commentId: true
                            }
                        }
                    },
                }
            }
        });
    }
    if (!ticket) {
        throw new CustomError(400, "Ticket not found");
    }
    return ticket;
}

const updateTicketById = async (user: any, id: any, data: UpdateTicketType) => {
    let ticket;
    if (user.role === 'CUSTOMER') {
        ticket = await prisma.ticket.update({
            data,
            where: {
                id,
                customerId: user.id
            }
        });
    } else if (user.role === 'ADMIN') {
        ticket = await prisma.ticket.update({
            data,
            where: {
                id
            }
        });
    }
    if (!ticket) {
        throw new CustomError(404, "Ticket not found");
    }
    return ticket;
}

const deleteTicketById = async (id: any) => {
    const ticket = await prisma.ticket.findFirst({
        where: {
            id
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    await prisma.ticket.delete({
        where: {
            id
        }
    });
}

const updateStatusById = async (user: any, data: UpdateStatusType, id: any) => {
    let ticket;
    if (user.role === 'AGENT') {
        ticket = await prisma.ticket.findFirst({
            where:{
                id
            }
        });
        if (user.id === ticket?.agentId) {
            ticket = await prisma.ticket.update({
                data,
                where: {
                    id
                }
            });  
        } else {
            throw new CustomError(401, 'Ticket is not available for this user');
        }
    } else if (user.role === 'ADMIN') {
        ticket = await prisma.ticket.update({
            data,
            where: {
                id
            }
        });
    }
    if (!ticket) {
        throw new CustomError(404, "Ticket not found");
    }
    return ticket;
}

const assignTicketToAgent = async (agentId: any, id: any) => {
    const agent = await prisma.user.findFirst({
        where: {
            id: agentId
        }
    });
    if (agent?.role != 'AGENT') {
        throw new CustomError(400, 'User is not Agent');
    }
    const ticket = prisma.ticket.update({
        where: {
            id
        },
        data: {
            agentId
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    return ticket;
}


export {
    createNewTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
    updateStatusById,
    assignTicketToAgent
}