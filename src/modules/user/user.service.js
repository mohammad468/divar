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
}

module.exports = new UserService();
