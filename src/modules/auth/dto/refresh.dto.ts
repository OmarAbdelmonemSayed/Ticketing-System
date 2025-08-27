import {z} from 'zod';

const refreshSchema = z.object({
    refreshToken: z.string()
}).strict()


type UserRefreshToken = z.infer<typeof refreshSchema>

export {
    refreshSchema,
    UserRefreshToken
}