import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "completed", "cancelled"),
      defaultValue: "pending",
    },
    currentStage: {
      type: DataTypes.ENUM("1", "2", "3"),
      defaultValue: "1",
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "enrollments",
    timestamps: true,
  }
);

export default Enrollment;