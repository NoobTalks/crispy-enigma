const Joi = require('joi');
const { regex } = require('../../helpers');

const signUp = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .required(),
  email: Joi.string()
    .email({
      multiple: false
    })
    .regex(regex.WOLOX_EMAIL)
    .required()
});

const signIn = Joi.object({
  email: Joi.string()
    .email({ multiple: false })
    .regex(regex.WOLOX_EMAIL)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

const getUsers = Joi.object({
  limit: Joi.number()
    .min(1)
    .max(20),
  since: Joi.number().min(1)
});

module.exports = {
  signUp,
  signIn,
  getUsers
};
