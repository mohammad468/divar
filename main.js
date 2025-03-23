const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDatabase } = require("./src/configs/mongoose.config");
const SwaggerConfig = require("./src/configs/swagger.config");
const mainRouter = require("./src/app.routes");
const { notFoundHandler } = require("./src/common/exception/notFound.handler");
const { allExceptionHandler } = require("./src/common/exception/allException.handler");
const cookieParser = require("cookie-parser");
dotenv.config();

const main = async () => {
  const app = express();
  const port = process.env.PORT;

  //database
  connectToDatabase();

  // encoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cookie
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  // CORS configuration
  app.use(cors());

  //swagger
  SwaggerConfig(app);

  //router
  app.use(mainRouter);

  // exceptions
  notFoundHandler(app);
  allExceptionHandler(app);

  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
};

main();
