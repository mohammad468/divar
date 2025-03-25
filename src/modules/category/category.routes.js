const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

router.post("/", categoryController.create);
router.get("/", categoryController.find);
router.get("/all", categoryController.getAll);
router.get("/:id", categoryController.findById);
router.delete("/:id", categoryController.delete);

module.exports = { CategoryRouter: router };
