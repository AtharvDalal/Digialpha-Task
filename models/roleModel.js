import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Role;
