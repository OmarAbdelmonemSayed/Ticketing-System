import asyncWrapper from '../utils/asyncWrapper';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { getPayload } from '../utils/createTokens';
import { AuthRequest } from '../utils/authReqest';

const isAuthenticated = asyncWrapper(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        let { authorization } = req.headers;
        if (!authorization) {
            throw new CustomError(401, "You must login first");
        }
        const payload = await getPayload(authorization, process.env.ACCESS_TOKEN_SECRET as string);
        req.role = payload.role;
        next();
    }
)


const hasPermission = (...roles: any) => {
    return asyncWrapper(
        async (req: AuthRequest, res: Response, next: NextFunction) => {
            if (!roles.includes(req.role)) {
                throw new CustomError(401, "You are not authorized to access this resource");
            }
            else {
                next();
            }
})}


export {
    isAuthenticated,
    hasPermission
}