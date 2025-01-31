const express = require("express");

const main = async () => {
  const app = express();

  app.listen(3000, () => {
    console.log("server: http://localhost:3000");
  });
};

main();