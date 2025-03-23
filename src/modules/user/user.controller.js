const autoBind = require("auto-bind");
const userService = require("./user.service");

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
}

module.exports = new UserController();
