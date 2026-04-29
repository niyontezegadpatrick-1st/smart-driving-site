export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("enrollments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    status: {
      type: Sequelize.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
    },
    enrolledAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    completedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("enrollments");
};