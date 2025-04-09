import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ force: true });
    console.log("connection has been established succsssfully.");
  })
  .catch((err) => {
    console.error("unable to connect to the database:", err);
  });

export default sequelize;
