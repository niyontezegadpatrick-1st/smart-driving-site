import jwt from "jsonwebtoken";
import User from "../database/model/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "smartdrivingsecret";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "Account is blocked" });
    }

    if (user.role !== "super_admin" && user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Admin login successful",
      admin: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "isActive", "createdAt"],
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { isActive: true } });
    const totalAdmins = await User.count({ where: { role: ["super_admin", "admin"] } });
    const activeAdmins = await User.count({ where: { role: ["super_admin", "admin"], isActive: true } });

    res.json({
      totalUsers,
      activeUsers,
      totalAdmins,
      activeAdmins,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};