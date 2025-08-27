import { CustomError } from "./../../utils/CustomError";
import { PrismaClient } from "@prisma/client";
import { CreateAttachmentType } from "../attachment/dto/createAttachment.dto";
import { UpdateAttachmentType } from "./dto/updateAttachment.dto";

const prisma = new PrismaClient();

const createNewAttachment = async (user: any, id: any, data: CreateAttachmentType) => {
    const comment = await prisma.comment.findFirst({
        where: {
            id: data.commentId
        }
    });
    if (!comment) {
        throw new CustomError(404, 'Comment not found');
    }
    if (user.id != comment?.userId) {
        throw new CustomError(401, 'Comment is not available for this user');
    }
    const attachment = await prisma.attachment.create({
        data: {
            ...data,
            userId: user.id,
        }
    });
    return attachment;
}

const getAllAttachments = async (user: any, id: any) => {
    let attachments;
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
            attachments = await prisma.ticket.findFirst({
                where: {
                    id
                },
                select: {
                    Comment: {
                        select: {
                            id: true,
                            Attachment: {
                                omit: {
                                    commentId: true
                                }
                            }
                        }
                    }
                }
            }); 
        } else {
            throw new CustomError(401, 'Ticket is not available for this user');
        }
    } else if (user.role === 'ADMIN') {
        attachments = await prisma.ticket.findFirst({
            where: {
                id
            },
            select: {
                Comment: {
                    select: {
                        id: true,
                        Attachment: {
                            omit: {
                                commentId: true
                            }
                        }
                    }
                }
            }
        });
    }
    return attachments;
}

const updateAttachmentById = async (user: any, attachmentId: any, data: UpdateAttachmentType) => {
    let attachment = await prisma.attachment.findFirst({
        where: {
            id: attachmentId
        }
    });
    if (!attachment) {
        throw new CustomError(404, 'Attachment not found');
    }

    if (user.id != attachment.userId) {
        throw new CustomError(401, 'Attachment is not available for this user');
    }

    attachment = await prisma.attachment.update({
        where: {
            id: attachmentId,
        },
        data
    });
}


const deleteAttachmentById = async (user: any, attachmentId: any) => {
    const attachment = await prisma.attachment.findFirst({
        where: {
            id: attachmentId
        }
    });
    if (!attachment) {
        throw new CustomError(404, 'Attachment not found');
    }

    if (user.id != attachment.userId) {
        throw new CustomError(401, 'Attachment is not available for this user');
    }

    await prisma.attachment.delete({
        where: {
            id: attachmentId,
        }
    });
}


export {
    createNewAttachment,
    getAllAttachments,
    updateAttachmentById,
    deleteAttachmentById
}