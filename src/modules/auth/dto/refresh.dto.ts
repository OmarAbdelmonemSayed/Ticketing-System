import {z} from 'zod';

const refreshSchema = z.object({
    refreshToken: z.string()
})


type UserRefreshToken = z.infer<typeof refreshSchema>

export {
    refreshSchema,
    UserRefreshToken
}