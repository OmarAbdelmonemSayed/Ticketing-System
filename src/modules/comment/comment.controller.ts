import { Request, Response } from 'express';
import asyncWrapper from './../../utils/asyncWrapper';
import { getPayload } from './../../utils/createTokens';
import { createNewComment, deleteCommentById, getAllComments, updateCommentById } from './comment.service';
import { createCommentSchema } from '../comment/dto/createComment.dto';
import { updateCommentSchema } from './dto/updateComment.dto';

const createComment = asyncWrapper(
    async (req: Request, res: Response) => {
        createCommentSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const comment = await createNewComment(payload, req.params.id, req.body);
        res.status(201).json({
            success: true,
            data: {
                comment
            },
            message: "Comment created successfully"
        });
    })



const getComments = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const comments = await getAllComments(payload, req.params.id);
        res.json({
            success: true,
            data: {
                comments
            },
            message: "Comments fetched successfully"
        });
    })



const updateComment = asyncWrapper(
    async (req: Request, res: Response) => {
        updateCommentSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const comment = await updateCommentById(payload, req.params.commentId, req.body);
        res.json({
            success: true,
            data: {
                comment
            },
            message: "Comment updated successfully"
        });
    })



const deleteComment = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        await deleteCommentById(payload, req.params.commentId);
        res.json({
            success: true,
            data: null,
            message: "Comment deleted successfully"
        });
    })


export {
    createComment,
    getComments,
    updateComment,
    deleteComment
}
