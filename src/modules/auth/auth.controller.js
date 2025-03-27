const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");
const { nodeEnd } = require("../../common/constant/env.enum");
const { CookieNames } = require("../../common/constant/cookie.enum");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile, fullName } = req.body;
      await this.#service.sendOTP(mobile, fullName);
      return res.json({
        message: AuthMessage.SendOtpSuccess,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const message = AuthMessage.LoginSuccessfully;
      const accessToken = await this.#service.checkOTP(mobile, code);
      return res
        .cookie(CookieNames.accessToken, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === nodeEnd.Development ? false : true,
        })
        .status(200)
        .json({ message, accessToken });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieNames.accessToken).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
