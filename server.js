import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/config.js";
import bodyParser from "body-parser";
import RoleRoutes from "./routes/roleRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/roles", RoleRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

startServer();
