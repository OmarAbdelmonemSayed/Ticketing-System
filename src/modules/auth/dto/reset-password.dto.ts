import { z } from 'zod';

const resetPasswordSchema = z.object({
    resetToken: z.string(),
    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be less than 30 characters" })
}).strict()


type UserResetPassword = z.infer<typeof resetPasswordSchema>

export {
    resetPasswordSchema,
    UserResetPassword
}