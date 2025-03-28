const autoBind = require("auto-bind");
const userService = require("./user.service");
const createHttpError = require("http-errors");
const httpCodes = require("http-codes");
const { UserMessage } = require("./user.messages");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async whoami(req, res, next) {
    try {
      const user = await this.#service.findUser(req.user.mobile);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async users(req, res, next) {
    try {
      const users = await this.#service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { mobile, fullName } = req.body;
    const user = await this.#service.createUser({ mobile, fullName });
    res.status(201).json(user);
  }

  async delete(req, res, next) {
    const userId = req.params.id;
    await this.#service.deleteUser(userId);
    res.status(httpCodes.NO_CONTENT).json({
      message: UserMessage.deleteSuccess,
    });
  }
}

module.exports = new UserController();
