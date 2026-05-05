import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const QuizResult = sequelize.define(
  "QuizResult",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
    },
    stage: {
      type: DataTypes.ENUM("1", "2", "3"),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER, // e.g. 70 means 70%
      allowNull: false,
    },
    passed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "quiz_results",
    timestamps: true,
  }
);

export default QuizResult;