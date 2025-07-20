import { createUserWithImage, getAllUsers } from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const { name, city } = req.body;
    const imagePath = req.file.filename;

    await createUserWithImage({ name, city, imagePath });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await getAllUsers({ page, limit, offset });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
