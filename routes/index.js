import { Router } from "express";
import userRoutes from "./user.js";

const router = Router();

router.use(userRoutes);

export default router;
