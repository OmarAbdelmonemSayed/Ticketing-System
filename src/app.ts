import express, { Application } from "express";
import 'dotenv/config';

const app: Application = express();

// Middlewares
app.use(express.json());

// Routes


export default app;
