import { CustomError } from "./../../utils/CustomError";
import { PrismaClient } from "@prisma/client";
import { CreateNoteType } from "./dto/createNote.dto";

const prisma = new PrismaClient();

const createNewNote = async (user: any, id: any, data: CreateNoteType) => {
    let note;
    const ticket = await prisma.ticket.findFirst({
        where: {
            id
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    if (user.role === 'AGENT') {
        if (user.id === ticket?.agentId || user.id === ticket?.customerId) {
            note = await prisma.note.create({

                        data: {
                            ...data,
                            ticketId: id,
                            userId: user.id
                        }
                    });
            await prisma.ticket.update({
                where: {
                    id
                },
                data: {
                    updatedAt: new Date()
                }
            });
        } else {
            throw new CustomError(401, 'Ticket is not available for this user');
        }
    } else if (user.role === 'ADMIN') {
        note = await prisma.note.create({
            data: {
                ...data,
                ticketId: id,
                userId: user.id
            }
        });
        await prisma.ticket.update({
            where: {
                id
            },
            data: {
                updatedAt: new Date()
            }
        });
    }
    return note;
}

const getAllNotes = async (user: any, id: any) => {
    let notes;
    const ticket = await prisma.ticket.findFirst({
        where: {
            id
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    if (user.role === 'AGENT') {
        if (user.id === ticket?.agentId || user.id === ticket?.customerId) {
            notes = await prisma.note.findMany({
                where: {
                    ticketId: id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true
                        }
                    }
                },
                omit: {
                    userId: true
                }
            }); 
        } else {
            throw new CustomError(401, 'Ticket is not available for this user');
        }
    } else if (user.role === 'ADMIN') {
        notes = await prisma.note.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true
                    }
                }
            },
            omit: {
                userId: true
            }
        });
    }
    return notes;
}

const updateNoteById = async (user: any, noteId: any, data: any) => {
    let note = await prisma.note.findFirst({
        where: {
            id: noteId
        }
    });
    if (!note) {
        throw new CustomError(404, 'Note not found');
    }
    if (user.id != note.userId) {
        throw new CustomError(401, 'Note is not available for this user');
    }
    note = await prisma.note.update({
        where: {
            id: noteId
        },
        data
    });
    await prisma.ticket.update({
        where: {
            id: note.ticketId
        },
        data: {
            updatedAt: new Date()
        }
    });
    return note;
}

const deleteNoteById = async (user: any, noteId: any) => {
    const note = await prisma.note.findFirst({
        where: {
            id: noteId
        }
    });
    if (!note) {
        throw new CustomError(404, 'Note not found');
    }
    if (user.id != note.userId) {
        throw new CustomError(401, 'Note is not available for this user');
    }
    await prisma.note.delete({
        where: {
            id: noteId
        },
    });
}

export {
    createNewNote,
    getAllNotes,
    updateNoteById,
    deleteNoteById
}