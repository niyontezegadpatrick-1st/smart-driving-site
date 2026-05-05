import sequelize from "../../../config/db.js";
import { seedCourses } from "../course.js";

const runSeeds = async () => {
  try {
    console.log("Starting database seeding...");

    await sequelize.authenticate();
    console.log("Database connected");

    await seedCourses();

    console.log("✅ All seeds completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeeds();