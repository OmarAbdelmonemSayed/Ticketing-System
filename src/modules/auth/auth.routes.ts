import express from "express";
import { userForgotPassword, userLogin, userLogout, userRefreshToken, userRegister, userResetPassword } from "./auth.controller";
import { hasPermission, isAuthenticated } from "../../middlewares/auth.middleware";

const router = express.Router();


router.route('/register')
    .post(userRegister);


router.route('/login')
    .post(userLogin);


router.route('/refresh')
    .post(userRefreshToken)


router.route('/logout')
    .post(userLogout)


router.route('/forgot-password')
    .post(userForgotPassword)


router.route('/reset-password')
    .post(userResetPassword)



export {
    router
};