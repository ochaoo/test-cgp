import { Router } from "express";
import multer from "multer";
import path from "path";
import { validateCreateUser } from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

router.get("/users", userController.listUsers);

router.post("/users", upload.single("image"), validateCreateUser, userController.createUser);

export default router;
