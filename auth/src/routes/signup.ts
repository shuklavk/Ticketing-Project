import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { validateRequest } from '../middlewares/valid-request';
import { RequestValidationError } from '../errors/request-validation-errors';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JsonWebToken and store on the session object
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    // store on session object
    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { router as signUpRouter };
