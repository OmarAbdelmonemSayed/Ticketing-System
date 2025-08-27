import { Request, Response } from 'express';
import asyncWrapper from './../../utils/asyncWrapper';
import { getPayload } from './../../utils/createTokens';
import { createNewAttachment, deleteAttachmentById, getAllAttachments, updateAttachmentById } from './attachment.service';
import { createAttachmentSchema } from '../attachment/dto/createAttachment.dto';
import { updateAttachmentSchema } from './dto/updateAttachment.dto';



const createAttachment = asyncWrapper(
    async (req: Request, res: Response) => {
        createAttachmentSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const Attachment = await createNewAttachment(payload, req.params.id, req.body);
        res.status(201).json({
            success: true,
            data: {
                Attachment
            },
            message: "Attachment created successfully"
        });
    })


const getAttachments = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const Attachments = await getAllAttachments(payload, req.params.id);
        res.json({
            success: true,
            data: {
                Attachments
            },
            message: "Attachments fetched successfully"
        });
    })

const updateAttachment = asyncWrapper(
    async (req: Request, res: Response) => {
        updateAttachmentSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const attachment = await updateAttachmentById(payload, req.params.attachmentId, req.body);
        res.json({
            success: true,
            data: {
                attachment
            },
            message: "Attachment updated successfully"
        });
    })

const deleteAttachment = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        await deleteAttachmentById(payload, req.params.attachmentId);
        res.json({
            success: true,
            data: null,
            message: "Attachment deleted successfully"
        });
    })


    
export {
    createAttachment,
    getAttachments,
    updateAttachment,
    deleteAttachment 
}
