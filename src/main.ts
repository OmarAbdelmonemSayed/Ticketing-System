import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await prisma.$connect();
        console.log("Connected to PostgreSQL");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
}

start();
