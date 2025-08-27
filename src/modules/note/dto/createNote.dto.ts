import {z} from 'zod';

const createNoteSchema = z.object({
    body: z.string()
}).strict()


type CreateNoteType = z.infer<typeof createNoteSchema>

export {
    createNoteSchema,
    CreateNoteType
}