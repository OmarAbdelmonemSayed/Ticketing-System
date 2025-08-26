import {z} from 'zod';

const updateDepartmentSchema = z.object({
    name: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" })
    .optional(),
    
    description: z.string().optional()
}).strict()


type updateDepartmentType = z.infer<typeof updateDepartmentSchema>

export {
    updateDepartmentSchema,
    updateDepartmentType
}