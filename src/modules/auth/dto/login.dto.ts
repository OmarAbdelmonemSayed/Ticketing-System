import {z} from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),

    password: z.string()
}).strict()


type UserLogin = z.infer<typeof loginSchema>

export {
    loginSchema,
    UserLogin
}