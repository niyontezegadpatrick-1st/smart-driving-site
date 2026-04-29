import Course from "../model/course.js";
import sequelize from "../../config/db.js";

export const seedCourses = async () => {
  await sequelize.sync({ force: true });

  const courses = [
    {
      title: "Traffic Rules Basics",
      description: "Learn the fundamental traffic rules and regulations",
      content: `
        # Traffic Rules Basics

        ## Stop Signs
        - Come to a complete stop at all stop signs
        - Check both directions before proceeding

        ## Traffic Lights
        - Red light: Stop completely
        - Green light: Proceed when safe
        - Yellow light: Prepare to stop

        ## Speed Limits
        - Urban areas: 40 km/h
        - Highways: 80 km/h
        - School zones: 30 km/h
      `,
      category: "traffic_rules",
      price: 0.0,
      isActive: true,
    },
    {
      title: "Road Safety Fundamentals",
      description: "Essential road safety practices for all drivers",
      content: `
        # Road Safety Fundamentals

        ## Defensive Driving
        - Always maintain safe distance
        - Check mirrors regularly
        - Anticipate other drivers' actions

        ## Weather Conditions
        - Rain: Reduce speed and increase following distance
        - Fog: Use low beam lights
        - Night: Use high beam lights appropriately

        ## Emergency Procedures
        - Always have emergency contacts
        - Keep first aid kit in vehicle
        - Know your location at all times
      `,
      category: "road_safety",
      price: 0.0,
      isActive: true,
    },
    {
      title: "Vehicle Control",
      description: "Master basic vehicle controls and maneuvers",
      content: `
        # Vehicle Control

        ## Steering
        - Use both hands on steering wheel
        - Turn wheel smoothly
        - Recover from skids

        ## Braking
        - Pump brakes on slippery surfaces
        - Use engine braking on hills
        - Practice emergency braking

        ## Parking
        - Parallel parking techniques
        - Garage parking
        - Hill parking with curb
      `,
      category: "vehicle_control",
      price: 0.0,
      isActive: true,
    },
    {
      title: "Driving Test Practice",
      description: "Practice test questions for driving license",
      content: `
        # Practice Test Questions

        1. What does a red traffic light mean?
        a) Proceed with caution
        b) Stop completely
        c) Slow down
        d) Turn left

        2. What is the speed limit in school zones?
        a) 50 km/h
        b) 40 km/h
        c) 30 km/h
        d) 60 km/h

        3. When should you use headlights?
        a) Only at night
        b) Only in rain
        c) In poor visibility
        d) Never

        4. What is defensive driving?
        a) Fast driving
        b) Aggressive driving
        c) Anticipating hazards
        d) Driving without a license
      `,
      category: "practice_test",
      price: 0.0,
      isActive: true,
    },
  ];

  for (const course of courses) {
    await Course.create(course);
  }

  console.log("Courses seeded successfully");
};