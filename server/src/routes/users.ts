import * as UserController from "../controllers/users";

import express from "express";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);
router.post("/login", UserController.login);
router.post("/signup", UserController.signUp);
router.post("/logout", requiresAuth, UserController.logout);

export default router;
