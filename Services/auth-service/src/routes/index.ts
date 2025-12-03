import { Router } from "express";
import { authRouter } from "./auth.routes";
import { tokenRouter } from "./token.routes";

export const router = Router();

router.use("/auth",authRouter);
router.use("/auth/token",tokenRouter);