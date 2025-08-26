import express, { Request, Response, NextFunction, Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { router as authRouter} from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { hasPermission, isAuthenticated } from "./middlewares/auth.middleware";
import { router as userRouter } from './modules/user/user.routes'; 
import {router as ticketRouter } from './modules/ticket/ticket/ticket.routes';

const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());



app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);



app.use(errorHandler)

export default app;


