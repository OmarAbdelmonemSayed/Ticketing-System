import {z} from 'zod';

const assignTicketSchema = z.object({
    agentId: z.string().optional()
}).strict()


type assignTicketType = z.infer<typeof assignTicketSchema>

export {
    assignTicketSchema,
    assignTicketType
}