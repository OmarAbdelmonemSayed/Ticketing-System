import {z} from 'zod';

const updateNoteSchema = z.object({
    body: z.string()
}).strict()


type updateNoteType = z.infer<typeof updateNoteSchema>

export {
    updateNoteSchema,
    updateNoteType
}