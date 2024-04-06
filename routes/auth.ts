import express from "express";
import { LogOut, Login, Register } from "../controllers/auth-controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', verifyToken, LogOut)

export default router