import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  city: Joi.string().min(1).required(),
});

export function validateCreateUser(req, res, next) {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  next();
}
