import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { router as authRouter} from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());



app.use('/api/auth', authRouter);

app.use(errorHandler)

export default app;
