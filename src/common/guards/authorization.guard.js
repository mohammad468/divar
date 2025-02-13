const createHttpError = require("http-errors");
const { AuthorizationMessage } = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../modules/user/user.model");
const { CookieNames } = require("../constant/cookie.enum");

const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookies?.[CookieNames.accessToken];
    if (!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (data?.id) {
      const user = await userModel.findById(data.id, { accessToken: 0, otp: 0 }).lean(); // lean() for best performance
      if (!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(AuthorizationMessage.invalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = { Authorization };
