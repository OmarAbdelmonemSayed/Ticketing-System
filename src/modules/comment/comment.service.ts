import { CustomError } from "./../../utils/CustomError";
import { PrismaClient } from "@prisma/client";
import { CreateCommentType } from "../comment/dto/createComment.dto";
import { UpdateCommentType } from "./dto/updateComment.dto";

const prisma = new PrismaClient();

const createNewComment = async (user: any, id: any, data: CreateCommentType) => {
    let comment;
    const ticket = await prisma.ticket.findFirst({
        where: {
            id
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    if (user.role === 'CUSTOMER' || user.role === 'AGENT') {
        if (user.id === ticket?.agentId || user.id === ticket?.customerId) {
            comment = await prisma.comment.create({

                        data: {
                            ...data,
                            ticketId: id,
                            userId: user.id
                        }
                    });
        } else {
            throw new CustomError(401, 'Ticket is not available for this user');
        }
    } else if (user.role === 'ADMIN') {
        comment = await prisma.comment.create({
            data: {
                ...data,
                ticketId: id,
                userId: user.id
            }
        });
    }
    return comment;
}

const getAllComments = async (user: any, id: any) => {
    let comments;
    const ticket = await prisma.ticket.findFirst({
        where: {
            id
        }
    });
    if (!ticket) {
        throw new CustomError(404, 'Ticket not found');
    }
    if (user.role === 'CUSTOMER' || user.role === 'AGENT') {
        if (user.id === ticket?.agentId || user.id === ticket?.customerId) {
            comments = await prisma.comment.findMany({
                where: {
                    ticketId: id
                },
                include: {
                    Attachment: {
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
                            commentId: true,
                            userId: true
                        }
                    },
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
        comments = await prisma.comment.findMany({
            include: {
                Attachment: {
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
                        commentId: true,
                        userId: true
                    }
                },
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
    return comments;
}

const updateCommentById = async (user: any, commentId: any, data: UpdateCommentType) => {
    let comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    });
    if (!comment) {
        throw new CustomError(404, 'Comment not found');
    }
    if (user.id != comment.userId) {
        throw new CustomError(401, 'Comment is not available for this user');
    }
    comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data
    });
    return comment;
}

const deleteCommentById = async (user: any, commentId: any) => {
    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    });
    if (!comment) {
        throw new CustomError(404, 'Comment not found');
    }
    if (user.id != comment.userId) {
        throw new CustomError(401, 'Comment is not available for this user');
    }
    await prisma.comment.delete({
        where: {
            id: commentId
        },
    });
}

export {
    createNewComment,
    getAllComments,
    updateCommentById,
    deleteCommentById
}