import {z} from 'zod';

const forgetPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
}).strict()


type UserForgetPassword = z.infer<typeof forgetPasswordSchema>

export {
    forgetPasswordSchema,
    UserForgetPassword
}