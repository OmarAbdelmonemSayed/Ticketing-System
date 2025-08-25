import { Request, Response } from 'express';
import asyncWrapper from '../../utils/asyncWrapper';
import { CustomError } from '../../utils/CustomError';
import jwt from 'jsonwebtoken';
import { createAccessTokenFromRefreshToken, createAccessandRefreshTokens, createResetToken, getPayload } from '../../utils/createTokens';
import { createUserSchema } from './dto/createUser.dto';
import { createNewUser, deleteUserById, getAllUsers, getUserById, updateUserById } from './user.service';
import { updateUserSchema } from './dto/updateUser.dto';
import { updateMyProfileSchema } from './dto/updateMyProfile';



const createUser = asyncWrapper(
    async (req: Request, res: Response) => {
        createUserSchema.parse(req.body);
        const user = await createNewUser(req.body);
        res.status(201).json({
            success: true,
            data: {
                user
            },
            message: "User created successfully"
        });
    })



const getUsers = asyncWrapper(
    async (req: Request, res: Response) => {
        const users = await getAllUsers();
        res.json({
            success: true,
            data: {
                users
            },
            message: "Users fetched successfully"
        });
    })



const getUser = asyncWrapper(
    async (req: Request, res: Response) => {
        if (!req.params.id) {
            throw new CustomError(400, "Enter a User Id")
        }
        const user = await getUserById(req.params.id);
        res.json({
            success: true,
            data: {
                user
            },
            message: "User fetched successfully"
        });
    })


const updateUser = asyncWrapper(
    async (req: Request, res: Response) => {
        updateUserSchema.parse(req.body);
        if (!req.params.id) {
            throw new CustomError(400, "Enter a User Id")
        }
        const user = await updateUserById(req.params.id, req.body);
        res.json({
            success: true,
            data: {
                user
            },
            message: "User updated successfully"
        });
    })



const deleteUser = asyncWrapper(
    async (req: Request, res: Response) => {
        if (!req.params.id) {
            throw new CustomError(400, "Enter a User Id")
        }
        await deleteUserById(req.params.id);
        res.json({
            success: true,
            data: null,
            message: "User deleted successfully"
        });
    })



const getMyProfile = asyncWrapper(
    async (req: Request, res: Response) => {
        if (!req.headers.authorization) {
            throw new CustomError(400, "Enter user token");
        }
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const user = await getUserById(payload.id);
        res.json({
            success: true,
            data: {
                user
            },
            message: "User fetched successfully"
        });
    })



const updateMyProfile = asyncWrapper(
    async (req: Request, res: Response) => {
        updateMyProfileSchema.parse(req.body);
        if (!req.headers.authorization) {
            throw new CustomError(400, "Enter user token");
        }
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const user = await updateUserById(payload.id, req.body);
        res.json({
            success: true,
            data: {
                user
            },
            message: "User updated successfully"
        });
    })



const deleteMyProfile = asyncWrapper(
    async (req: Request, res: Response) => {
        if (!req.headers.authorization) {
            throw new CustomError(400, "Enter user token");
        }
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        await deleteUserById(payload.id);
        res.json({
            success: true,
            data: null,
            message: "User deleted successfully"
        });
    })

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile
}