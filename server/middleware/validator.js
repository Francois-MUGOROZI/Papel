import { signupSchema, loginSchema } from '../helpers/validSchema';

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
