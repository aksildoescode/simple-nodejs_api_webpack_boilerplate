import Joi from "joi";

// regex require a password to have 6 char and at least one capital lettter
export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
  signup: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().regex(passwordReg),
    fullname: Joi.string().required(),
    username: Joi.string().required()
  }
};
