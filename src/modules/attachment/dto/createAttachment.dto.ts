import {z} from 'zod';

const createAttachmentSchema = z.object({
    commentId: z.string()
}).strict()


type CreateAttachmentType = z.infer<typeof createAttachmentSchema>

export {
    createAttachmentSchema,
    CreateAttachmentType
}
