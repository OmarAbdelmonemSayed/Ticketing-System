import {z} from 'zod';

const updateMyProfileSchema = z.object({
    firstName: z.string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(20, { message: "First name must be less than 20 characters" })
        .optional(),

    lastName: z.string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(20, { message: "Last name must be less than 20 characters" })
        .optional(),

    email: z.string().email({ message: "Invalid email address" }).optional(),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be less than 30 characters" })
        .optional()
}).strict()


type UpdateMyProfileType = z.infer<typeof updateMyProfileSchema>

export {
    updateMyProfileSchema,
    UpdateMyProfileType
}