import User from "../model/users.js";
import sequelize from "../../config/db.js";

export const seedUsers = async () => {
  await sequelize.sync({ force: true });

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "+250789123456",
      isActive: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
      phone: "+250789123457",
      isActive: true,
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      password: "password123",
      phone: "+250789123458",
      isActive: true,
    },
  ];

  for (const user of users) {
    await User.create(user);
  }

  console.log("Users seeded successfully");
};