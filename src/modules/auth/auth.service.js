const autoBind = require("auto-bind");
const { userModel } = require("../user/user.model");
const createHttpError = require("http-errors");
const { AuthMessage } = require("./auth.messages");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile, fullName) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    const code = randomInt(10000, 99999);
    const expiresIn = now + 1000 * 60 * 2;
    const otp = { code, expiresIn };
    console.log({ mobile, otp });
    if (!user) {
      const newUser = await this.#model.create({ mobile, otp, fullName });
      return newUser;
    }

    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessage.OtpNotExpired);
    }

    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {
    const user = await this.checkExistByMobile(mobile);
    const now = new Date().getTime();
    if (user?.otp?.expiresIn < now) {
      throw new createHttpError.Unauthorized(AuthMessage.OtpExpired);
    }
    if (user?.otp?.code !== code) {
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);
    }
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
      await user.save();
    }
    const accessToken = this.signToken({ mobile, id: user._id });
    user.accessToken = accessToken;
    user.role = "ADMIN";
    await user.save();
    return accessToken;
  }
  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFoundUser);
    return user;
  }
  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
  }
}

module.exports = new AuthService();
