import bcrypt from "bcryptjs";
import { generateToken } from "../services/authService.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { Op } from "sequelize";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, roleName } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    let role = await Role.findOne({ where: { name: roleName || "user" } });
    if (!role) {
      role = await Role.create({ name: roleName || "user" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      roleId: role.id,
    });

    const token = generateToken({ ...newUser.dataValues, role: role.name });

    res.status(201).json({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        role: role.name,
      },
      token,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "error during regesrtartion error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    return res
      .status(500)
      .json({ message: "Server error while getting user by id" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    return res
      .status(500)
      .json({ message: "Server error while updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).send("User not found");

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role } = req.query;

    const filters = {};
    if (firstName) filters.firstName = { [Op.like]: `%${firstName}%` };
    if (lastName) filters.lastName = { [Op.like]: `%${lastName}%` };
    if (email) filters.email = { [Op.like]: `%${email}%` };
    if (phone) filters.phone = { [Op.like]: `%${phone}%` };

    const users = await User.findAll({
      where: filters,
      include: [
        {
          model: Role,
          where: role ? { name: role } : undefined,
        },
      ],
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
