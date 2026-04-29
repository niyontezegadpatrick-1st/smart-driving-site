import Enrollment from "../model/enrollment.js";
import sequelize from "../../config/db.js";

export const seedEnrollments = async () => {
  await sequelize.sync({ force: true });

  const enrollments = [
    {
      userId: 1,
      courseId: 1,
      status: "completed",
      completedAt: new Date(),
    },
    {
      userId: 1,
      courseId: 2,
      status: "pending",
    },
    {
      userId: 2,
      courseId: 1,
      status: "pending",
    },
    {
      userId: 2,
      courseId: 3,
      status: "completed",
      completedAt: new Date(),
    },
    {
      userId: 3,
      courseId: 2,
      status: "pending",
    },
    {
      userId: 3,
      courseId: 4,
      status: "cancelled",
    },
  ];

  for (const enrollment of enrollments) {
    await Enrollment.create(enrollment);
  }

  console.log("Enrollments seeded successfully");
};