import {z} from 'zod';

const updateAttachmentSchema = z.object({
    fileUrl: z.string(),
}).strict()


type UpdateAttachmentType = z.infer<typeof updateAttachmentSchema>

export {
    updateAttachmentSchema,
    UpdateAttachmentType
}
