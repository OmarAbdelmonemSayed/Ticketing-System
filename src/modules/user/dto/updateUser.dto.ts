import {z} from 'zod';
import { Role } from '@prisma/client';

const updateUserSchema = z.object({
    firstName: z.string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(20, { message: "First name must be less than 20 characters" })
        .optional(),

    lastName: z.string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(20, { message: "Last name must be less than 20 characters" })
        .optional(),

    email: z.string().email({ message: "Invalid email address" }).optional(),
    role: z.enum([Role.CUSTOMER, Role.AGENT, Role.ADMIN]).optional(),
    departmentId: z.string().optional()
}).strict()


type UpdateUserType = z.infer<typeof updateUserSchema>

export {
    updateUserSchema,
    UpdateUserType
}