import "dotenv/config";

import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";

import MongoStore from "connect-mongo";
import authRoutes from "./routes/users";
import cors from "cors";
import env from "./utils/validateEnv";
import journalRoutes from "./routes/journals";
import morgan from "morgan";
import { requiresAuth } from './middleware/auth';
import session from "express-session";

const app = express();

const options: cors.CorsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
};

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 10000, // 1 hour //todo change this
            // sameSite: "none",
            // secure: true,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: env.MONGO_CONNECTION_STRING,
        }),
    })
);

// Endpoints
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Routers
app.use("/api/auth", authRoutes);
app.use("/api/journals", requiresAuth, journalRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;
