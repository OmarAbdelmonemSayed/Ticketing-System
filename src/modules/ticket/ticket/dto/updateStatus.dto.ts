import { TicketStatus } from '@prisma/client';
import {z} from 'zod';

const updateStatusSchema = z.object({
    status: z.enum([TicketStatus.OPEN, TicketStatus.PENDING, TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED, TicketStatus.CLOSED])
}).strict()


type UpdateStatusType = z.infer<typeof updateStatusSchema>

export {
    updateStatusSchema,
    UpdateStatusType
}