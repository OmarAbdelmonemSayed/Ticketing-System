import {z} from 'zod';

const createDepartmentSchema = z.object({
    name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
    
    description: z.string()
}).strict()


type CreateDepartmentType = z.infer<typeof createDepartmentSchema>

export {
    createDepartmentSchema,
    CreateDepartmentType
}