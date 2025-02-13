const { Router } = require("express");
const userController = require("./user.controller");
const { Authorization } = require("../../common/guards/authorization.guard");
const router = Router();

router.get("/whoami", Authorization, userController.whoami);

module.exports = { UserRouter: router };
