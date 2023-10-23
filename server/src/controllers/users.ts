import { RequestHandler } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        // Get user from database
        const user = await UserModel.findById(req.session.userId)
            .select("+email")
            .exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        // Check if parameters are missing
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        // Check if username already exists
        const existingUsername = await UserModel.findOne({
            username: username,
        }).exec();
        if (existingUsername) {
            throw createHttpError(
                409,
                "Username already taken. Please choose a different one or log in instead."
            );
        }

        // Check if email already exists
        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(
                409,
                "A user with this email address already exists. Please log in instead."
            );
        }

        // Hash password
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        // Add user to database
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        // Create a session
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string;
    password?: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Check if parameters are missing
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        // Get user and check username exists
        const user = await UserModel.findOne({ username: username })
            .select("+password +email")
            .exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        // Create a session
        req.session.userId = user._id;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    // Remove the session fom the database
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};
