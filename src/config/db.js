import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

// OPTIONAL FUNCTION (only if you want it)
export const createDatabaseIfNotExists = async () => {
  console.log("Database check skipped or custom logic here");
};

export default sequelize;