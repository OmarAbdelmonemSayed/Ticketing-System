import {z} from 'zod';

const logoutSchema = z.object({
    refreshToken: z.string()
})


type UserLogout = z.infer<typeof logoutSchema>

export {
    logoutSchema,
    UserLogout
}