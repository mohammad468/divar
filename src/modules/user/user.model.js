// imports
const { Schema, model } = require("mongoose");

// OTP Schema
const OTPSchemaConfig = {
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
};
const OTPSchema = new Schema(OTPSchemaConfig);

// User Schema
const userSchemaConfig = {
  fullName: { type: String, required: false },
  role: { type: String, required: false },
  mobile: { type: String, required: true, unique: true },
  otp: { type: OTPSchema },
  verifiedMobile: { type: Boolean, required: true, default: false },
  accessToken: { type: String },
};
const userSchema = new Schema(userSchemaConfig, { timestamps: true });

// models
const userModel = model("user", userSchema);

// exports
module.exports = { userModel };
