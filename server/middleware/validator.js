import { signupSchema } from '../helpers/validSchema';

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
