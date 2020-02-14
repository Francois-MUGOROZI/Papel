import {
  signupSchema,
  loginSchema,
  accountSchema,
  transSchema
} from '../helpers/validSchema';

// validate the signup parameters
export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(422).json({
      status: res.statusCode,
      error: 'invalid input'
    });
    console.log(error);
  } else next();
};

// validate the login parametes
export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(422).json({
      status: res.statusCode,
      error: 'Invalid inputs'
    });
  } else next();
};

// validate account
export const validateAccount = (req, res, next) => {
  const { error } = accountSchema.validate({
    type: req.body.type,
    status: req.body.status,
    owner: req.body.owner
  });

  if (error) {
    res.status(422).json({
      status: res.statusCode,
      error: 'Invalid inputs'
    });
  } else next();
};

// valite transaction
export const validateTrans = (req, res, next) => {
  const { error } = transSchema.validate({
    type: req.body.type,
    accountNumber: req.body.accountNumber,
    amount: req.body.amount,
    cashier: req.body.cashier
  });

  if (error) {
    res.status(422).json({
      status: res.statusCode,
      error: 'Invalid inputs'
    });
  } else next();
};