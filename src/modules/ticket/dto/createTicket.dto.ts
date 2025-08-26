import {z} from 'zod';

const createTicketSchema = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters" })
        .max(50, { message: "Title must be less than 20 characters" }),

    description: z.string(),
}).strict()


type CreateTicketType = z.infer<typeof createTicketSchema>

export {
    createTicketSchema,
    CreateTicketType
}