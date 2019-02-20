import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { hashSync, compareSync } from "bcrypt-nodejs";

import { passwordReg } from "./user.validations";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    validates: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "{VALUE} is not a valid email"
    }
  },
  fullname: {
    type: String,
    required: [true, "Full name is required"]
  },
  username: {
    type: String,
    required: [true, "Full name is required"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,

    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: "{VALUE} is not a valid password"
    }
  }
});
userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  //return next if nothing happen
  return next();
});
userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  }
};

export default mongoose.model("User", userSchema);
