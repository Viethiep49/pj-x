import express from "express"
import sequelize from "./config/db.js";
import petsRouter from "./routes/petsRouters.js";

const app = express();

await sequelize.authenticate();

app.use("/api/pets" , petsRouter);

app.listen(5001 , () => {
  console.log("Web is running on http://localhost:5001");
});