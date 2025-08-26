import express from "express";
import { hasPermission, isAuthenticated } from "./../../middlewares/auth.middleware";
import { createDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from "./department.controller";

const router = express.Router();


router.route('/')
    .get(isAuthenticated, hasPermission('ADMIN'), getDepartments)
    .post(isAuthenticated, hasPermission('ADMIN'), createDepartment)

router.route('/:id')
    .get(isAuthenticated, hasPermission('ADMIN'), getDepartment)
    .patch(isAuthenticated, hasPermission('ADMIN'), updateDepartment)
    .delete(isAuthenticated, hasPermission('ADMIN'), deleteDepartment)

export {
    router
};