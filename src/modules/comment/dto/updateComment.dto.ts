import {z} from 'zod';

const updateCommentSchema = z.object({
    body: z.string()
}).strict()


type UpdateCommentType = z.infer<typeof updateCommentSchema>

export {
    updateCommentSchema,
    UpdateCommentType
}
