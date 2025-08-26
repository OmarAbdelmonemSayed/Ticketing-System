import {z} from 'zod';

const createCommentSchema = z.object({
    body: z.string()
}).strict()


type CreateCommentType = z.infer<typeof createCommentSchema>

export {
    createCommentSchema,
    CreateCommentType
}
