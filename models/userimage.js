import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserImage extends Model {
    static associate(models) {
      UserImage.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  UserImage.init(
    {
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserImage",
    }
  );

  return UserImage;
};
