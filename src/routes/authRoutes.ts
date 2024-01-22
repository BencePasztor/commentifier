import { Router } from "express";
import asyncWrapper from "@/utils/asyncWrapper";
import { register, login, logout } from "@/controllers/authController";

const router = Router()

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.delete('/logout', asyncWrapper(logout))

export default router