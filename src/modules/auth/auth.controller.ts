import { Request, Response } from 'express';
import { UserRegister, registerSchema } from './dto/register.dto';
import { UserLogin, loginSchema } from './dto/login.dto';
import { UserForgetPassword, forgetPasswordSchema } from './dto/forgot-password.dto';
import { UserResetPassword, resetPasswordSchema } from './dto/reset-password.dto';
import { UserRefreshToken, refreshSchema } from './dto/refresh.dto';
import { UserLogout, logoutSchema } from './dto/logout.dto';
import asyncWrapper from '../../utils/asyncWrapper';
import { checkRefreshToken, createUser, findUserByEmail, findUserByEmailandPassword, removeRefreshToken, storeRefreshToken, updateUserNewPassword } from './auth.service';
import { CustomError } from '../../utils/CustomError';
import jwt from 'jsonwebtoken';
import { createAccessTokenFromRefreshToken, createAccessandRefreshTokens, createResetToken, getPayload } from '../../utils/createTokens';
import { sendMail } from '../../services/notification.service';
import { success } from 'zod';



const userRegister = asyncWrapper(
    async (req: Request, res: Response) => {
        registerSchema.parse(req.body);
        const user = await createUser(req.body);
        res.status(201).json({ success: true, data: { user } })
    })



const userLogin = asyncWrapper(
    async (req: Request, res: Response) => {
        loginSchema.parse(req.body);
        const user = await findUserByEmailandPassword(req.body);
        const { accessToken, refreshToken } = await createAccessandRefreshTokens(user);
        if (!accessToken || !refreshToken) {
            throw new CustomError(500, "Can't generate tokens");
        }
        await storeRefreshToken(user, refreshToken)
        res.json({
            success: true, data: {
                accessToken,
                refreshToken
            }
        })
    })



const userRefreshToken = asyncWrapper(
    async (req: Request, res: Response) => {
        refreshSchema.parse(req.body);
        await checkRefreshToken(req.body.refreshToken);
        const accessToken = await createAccessTokenFromRefreshToken(req.body.refreshToken);
        if (!accessToken) {
            throw new CustomError(500, "Can't generate access token");
        }
        res.json({
            success: true, data: {
                accessToken
            }
        })
    })


const userLogout = asyncWrapper(
    async (req: Request, res: Response) => {
        logoutSchema.parse(req.body);
        await removeRefreshToken(req.body.refreshToken);
        res.status(204).json();
    })



const userForgotPassword = asyncWrapper(
    async (req: Request, res: Response) => {
        forgetPasswordSchema.parse(req.body);
        const user = await findUserByEmail(req.body.email);
        const resetToken = await createResetToken(user);
        await sendMail(user, resetToken);
        res.json({
        success: true,
        data: {
            message: 'Password reset email sent successfully. Please check your inbox and follow the instructions.'
        }
});
    })


const userResetPassword = asyncWrapper(
    async (req: Request, res: Response) => {
        resetPasswordSchema.parse(req.body);
        const payload = await getPayload(req.body.resetToken, process.env.RESET_TOKEN_SECRET as string);
        const user = await updateUserNewPassword(payload, req.body.newPassword);
        res.json({success: true, data: {user}});
    })



export {
    userRegister,
    userLogin,
    userRefreshToken,
    userLogout,
    userForgotPassword,
    userResetPassword
}