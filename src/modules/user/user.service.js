const autoBind = require("auto-bind");
const { userModel } = require("./user.model");
const createHttpError = require("http-errors");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }

  async findUser(mobile) {
    try {
      const user = await this.#model.findOne({ mobile });
      return user;
    } catch (error) {
      throw new createHttpError.NotFound("user not found");
    }
  }

  async createUser({ mobile, fullName }) {
    try {
      const user = await this.#model.findOne({ mobile });
      user.fullName = fullName;
      await user.save();
      return user;
    } catch (error) {
      throw new createHttpError.NotFound("user not found");
    }
  }

  async getUsers() {
    const users = await this.#model.find();
    return users;
  }
}

module.exports = new UserService();
