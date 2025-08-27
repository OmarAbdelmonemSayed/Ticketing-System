import jwt from 'jsonwebtoken';
import { CustomError } from './CustomError';

const createAccessandRefreshTokens = (data: any) => {
    const accessToken = jwt.sign({id: data.id, email: data.email, role: data.role}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '15m'});  
    const refreshToken = jwt.sign({id: data.id, email: data.email, role: data.role}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '7d'});  
    return {accessToken, refreshToken};
}

const createAccessTokenFromRefreshToken = async (refreshToken: any) => {
   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
   if (!decoded || typeof decoded !=='object') {
        throw new CustomError(400, "Invalid refresh token payload");
   }
    const accessToken = jwt.sign({id: decoded.id, email: decoded.email, role: decoded.role}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '15m'});
    return accessToken;
}

const createResetToken = async (data: any) => {
    const resetToken = jwt.sign({id: data.id, email: data.email, role: data.role}, process.env.RESET_TOKEN_SECRET as string, {expiresIn: '1h'});  
    return resetToken;
}

const getPayload = async(token: any, secret: string) => {
    const payload = jwt.verify(token, secret);
    if (!payload || typeof payload !=='object') {
        throw new CustomError(400, "Invalid token payload");
   }
   return payload;
}

export {
    createAccessandRefreshTokens,
    createAccessTokenFromRefreshToken,
    createResetToken,
    getPayload
}