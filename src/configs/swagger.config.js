const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const port = process.env.PORT;

const SwaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Divar Backend",
        description: "Divar API with Express.js",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: "Local Development Server",
        },
      ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Swagger is running at: http://localhost:${port}/api-docs`);
};

module.exports = SwaggerConfig;
