const autoBind = require("auto-bind");
const { categoryModel } = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessage = require("./category.message");
const { default: slugify } = require("slugify");

class categoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = categoryModel;
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExistBySlug(categoryDto.slug);
    }
    if (!categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.name);
      await this.alreadyExistBySlug(categoryDto.slug);
    }
    const category = this.#model.create(categoryDto);
    return category;
  }

  async find() {
    return await this.#model.find({ parent: { $exists: false } }).populate([{ path: "children" }]);
  }

  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(categoryMessage.notFound);
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(categoryMessage.notFound);
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category) throw new createHttpError.Conflict(categoryMessage.alreadyExist);
    return null;
  }
}

module.exports = new categoryService();
