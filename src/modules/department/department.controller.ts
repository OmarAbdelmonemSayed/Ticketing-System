import { Request, Response } from 'express';
import asyncWrapper from '../../utils/asyncWrapper';
import { CustomError } from '../../utils/CustomError';
import { createDepartmentSchema } from './dto/createDepartment.dto';
import { createNewDepartment, deleteDepartmentById, getAllDepartments, getDepartmentById, updateDepartmentById } from './department.service';
import { updateDepartmentSchema } from './dto/updateDepartment.dto';


const createDepartment = asyncWrapper(
    async (req: Request, res: Response) => {
        createDepartmentSchema.parse(req.body);
        const department = await createNewDepartment(req.body);
        res.status(201).json({
            success: true,
            data: {
                department
            },
            message: "Department created successfully"
        });
    })

const getDepartments = asyncWrapper(
    async (req: Request, res: Response) => {
        const departments = await getAllDepartments();
        res.json({
            success: true,
            data: {
                departments
            },
            message: "Departments fetched successfully"
        });
    })

const getDepartment = asyncWrapper(
    async (req: Request, res: Response) => {
        const department = await getDepartmentById(req.params.id);
        res.json({
            success: true,
            data: {
                department
            },
            message: "Department fetched successfully"
        });
    })    

const updateDepartment = asyncWrapper(
    async (req: Request, res: Response) => {
        updateDepartmentSchema.parse(req.body);
        const department = await updateDepartmentById(req.params.id, req.body);
        res.json({
            success: true,
            data: {
                department
            },
            message: "Department updated successfully"
        });
    })
    
const deleteDepartment = asyncWrapper(
    async (req: Request, res: Response) => {
       await deleteDepartmentById(req.params.id);
        res.json({
            success: true,
            data: null,
            message: "Department deleted successfully"
        });
    })

export {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
}
