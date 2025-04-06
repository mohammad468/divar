const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const categoryMessage = require("./category.message");

const httpCodes = require("http-codes");
const createHttpError = require("http-errors");

class categoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      if(!!parent) await this.#service.create({ name, icon, slug, parent });
      await this.#service.create({ name, icon, slug });
      return res.status(httpCodes.CREATED).json({
        message: categoryMessage.created,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.status(httpCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll();
      return res.status(httpCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    const categoryId = req.params.id;
    if (!categoryId) return res.status(400).json(createHttpError.BadRequest("test"));
    const category = await this.#service.findOneById(categoryId);
    if (!category) return res.status(createHttpError.NotFound(categoryMessage.notFound));
    return res.status(httpCodes.OK).json(category);
  }

  async delete(req, res, next) {
    try {
      const categoryId = req.params.id;
      if (!categoryId) return res.status(404).json(createHttpError.BadRequest("category not found"));
      await this.#service.deleteCategory(categoryId);
      res.status(httpCodes.OK).json({
        message: "deleted data successfully",
      });
    } catch (error) {
      next();
    }
  }
}

module.exports = new categoryController();
