const autoBind = require("auto-bind");
const { userModel } = require("./user.model");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }

  async foo(req, res, next) {
    try {
      console.log(req);
      console.log(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserService();
