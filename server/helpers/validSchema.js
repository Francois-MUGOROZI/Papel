import Joi from '@hapi/joi';

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(40)
    .required(),

  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(40)
    .required(),

  type: Joi.string()
    .alphanum()
    .min(2)
    .max(10)
    .required(),

  status: Joi.string()
    .alphanum()
    .min(2)
    .max(10)
    .required(),

  isAdmin: Joi.types().boolean.required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2
    })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});
