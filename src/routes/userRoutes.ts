import { Router } from "express";
import asyncWrapper from "@/utils/asyncWrapper";
import { authMiddleware, multerProfileMiddleware } from "@/middleware";
import { getCurrentUser, updateProfile } from "@/controllers/userController";

const router = Router()

router.get('/me', authMiddleware, getCurrentUser)
router.patch('/profile', authMiddleware, multerProfileMiddleware, asyncWrapper(updateProfile)) //(profile pic modification for now, TODO: add other stuff later)

export default router