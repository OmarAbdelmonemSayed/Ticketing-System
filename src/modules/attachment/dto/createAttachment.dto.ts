import {z} from 'zod';

const createAttachmentSchema = z.object({
    fileUrl: z.string(),
    commentId: z.string()
}).strict()


type CreateAttachmentType = z.infer<typeof createAttachmentSchema>

export {
    createAttachmentSchema,
    CreateAttachmentType
}
