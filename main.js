const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./src/configs/mongoose.config");
const { swaggerConfig } = require("./src/configs/swagger.config");
dotenv.config();

const main = async () => {
  const app = express();
  const port = process.env.PORT;

  //database
  connectToDatabase();

  //swagger
  swaggerConfig(app);

  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
};

main();