import db from "../models/index.js";

const { User, UserImage, sequelize } = db;

export const createUserWithImage = async ({ name, city, imagePath }) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.create({ name, city }, { transaction });
    await UserImage.create({ image: imagePath, userId: user.id }, { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getAllUsers = async ({ page, limit, offset }) => {
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

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
