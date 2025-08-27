import { Request, Response } from 'express';
import asyncWrapper from './../../utils/asyncWrapper';
import { createNoteSchema } from './dto/createNote.dto';
import { getPayload } from './../../utils/createTokens';
import { createNewNote, deleteNoteById, getAllNotes, updateNoteById } from './note.service';
import { updateNoteSchema } from './dto/updateNote.dto';


const createNote = asyncWrapper(
    async (req: Request, res: Response) => {
        createNoteSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const Note = await createNewNote(payload, req.params.id, req.body);
        res.status(201).json({
            success: true,
            data: {
                Note
            },
            message: "Note created successfully"
        });
    })


const getNotes = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const notes = await getAllNotes(payload, req.params.id);
        res.json({
            success: true,
            data: {
                notes
            },
            message: "Notes fetched successfully"
        });
    })


const updateNote = asyncWrapper(
    async (req: Request, res: Response) => {
        updateNoteSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const note = await updateNoteById(payload, req.params.noteId, req.body);
        res.json({
            success: true,
            data: {
                note
            },
            message: "Note updated successfully"
        });
    })


const deleteNote = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        await deleteNoteById(payload, req.params.noteId);
        res.json({
            success: true,
            data: null,
            message: "Note deleted successfully"
        });
    })


export {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}