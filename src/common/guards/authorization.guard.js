const createHttpError = require("http-errors");
const { AuthorizationMessage } = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../modules/user/user.model");
const { CookieNames } = require("../constant/cookie.enum");

const Authorization = async (req, res, next) => {
  try {
    // Extract token from cookies
    // const token = req?.cookies?.[CookieNames.accessToken];
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);

    // Verify token
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (data?.id) {
      // Find user by ID
      const user = await userModel.findById(data.id, { accessToken: 0, otp: 0 }).lean();
      if (!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);

      // Attach user to request object
      req.user = user;
      return next();
    }

    throw new createHttpError.Unauthorized(AuthorizationMessage.invalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = { Authorization };
