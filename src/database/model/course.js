import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(
        "traffic_rules",
        "road_safety",
        "vehicle_control",
        "parking",
        "emergency",
        "practice_test"
      ),
      allowNull: false,
    },
    stage: {
      type: DataTypes.ENUM("1", "2", "3"),
      allowNull: false,
      defaultValue: "1",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "courses",
    timestamps: true,
  }
);

export default Course;