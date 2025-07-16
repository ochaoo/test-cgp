import { Router } from "express";
import Joi from "joi";
import multer from "multer";
import path from "path";

import db from "../models/index.js";

const router = Router();

const { User, UserImage } = db;

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

router.get("/users", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await User.findAll({
      attributes: {
        include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("images.id")), "images_count"]],
      },
      include: [
        {
          model: UserImage,
          as: "images",
          attributes: [],
          required: false,
          duplicating: false,
        },
      ],
      group: ["User.id"],
      order: [[db.Sequelize.literal("images_count"), "DESC"]],
      limit,
      offset,
      subQuery: false,
    });

    const total = await User.count();

    res.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

router.post("/users", upload.single("image"), async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    const user = await User.create(
      { name: req.body.name, city: req.body.city },
      { include: [{ model: UserImage, as: "images" }] }
    );

    await UserImage.create({
      image: req.file.filename,
      userId: user.id,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

export default router;
