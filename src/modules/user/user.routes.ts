import express from "express";
import { hasPermission, isAuthenticated } from "../../middlewares/auth.middleware";
import { createUser, deleteMyProfile, deleteUser, getMyProfile, getUser, getUsers, updateMyProfile, updateUser } from "./user.controller";

const router = express.Router();


router.route('/me')
    .get(isAuthenticated, getMyProfile)
    .patch(isAuthenticated, updateMyProfile)
    .delete(isAuthenticated, deleteMyProfile);



router.route('/')
    .post(isAuthenticated, hasPermission('ADMIN'), createUser)
    .get(isAuthenticated, hasPermission('ADMIN'), getUsers);



router.route('/:id')
    .get(isAuthenticated, hasPermission('ADMIN'), getUser)
    .patch(isAuthenticated, hasPermission('ADMIN'), updateUser)
    .delete(isAuthenticated, hasPermission('ADMIN'), deleteUser);


export {
    router
};