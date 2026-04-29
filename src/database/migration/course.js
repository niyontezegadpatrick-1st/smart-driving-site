export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("courses", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    category: {
      type: Sequelize.ENUM(
        "traffic_rules",
        "road_safety",
        "vehicle_control",
        "parking",
        "emergency",
        "practice_test"
      ),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
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
  await queryInterface.dropTable("courses");
};