import {z} from 'zod';

const updateTicketSchema = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters" })
        .max(50, { message: "Title must be less than 20 characters" })
        .optional(),

    description: z.string().optional()
}).strict()


type UpdateTicketType = z.infer<typeof updateTicketSchema>

export {
    updateTicketSchema,
    UpdateTicketType
}