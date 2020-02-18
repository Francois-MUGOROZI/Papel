import Joi from '@hapi/joi';

// validating signup info
export const signupSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .required(),

  lastName: Joi.string()
    .min(2)
    .max(40)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2
    })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

// validating login info
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

// validating account
export const accountSchema = Joi.object({
  type: Joi.string()
    .alphanum()
    .max(10)
    .required(),
  owner: Joi.string().required()
});

// validate transaction
export const transSchema = Joi.object({
  type: Joi.string()
    .alphanum()
    .max(10)
    .required(),
  accountNumber: Joi.required(),
  amount: Joi.number().required(),
  cashier: Joi.string().required()
});
