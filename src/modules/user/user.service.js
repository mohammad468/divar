const autoBind = require("auto-bind");
const { userModel } = require("./user.model");
const createHttpError = require("http-errors");
const { UserMessage } = require("./user.messages");

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
      if (!user) {
        const newUser = await this.#model.create({ mobile, fullName });
        if (!newUser) throw new createHttpError[500]("can not create new user");
        return newUser;
      }
      user.fullName = fullName;
      await user.save();
      return user;
    } catch (error) {
      throw new createHttpError.NotFound("user not found");
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.#model.findById(userId);
      if (!user) throw new createHttpError.NotFound(UserMessage.notFound);
      await user.deleteOne();
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
