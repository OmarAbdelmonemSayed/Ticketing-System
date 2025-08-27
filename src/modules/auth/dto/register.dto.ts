import {z} from 'zod';

const registerSchema = z.object({
    firstName: z.string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(20, { message: "First name must be less than 20 characters" }),

    lastName: z.string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(20, { message: "Last name must be less than 20 characters" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be less than 30 characters" }),
}).strict()


type UserRegister = z.infer<typeof registerSchema>

export {
    registerSchema,
    UserRegister
}