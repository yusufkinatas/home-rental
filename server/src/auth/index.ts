import express from 'express';
import _ from 'lodash';
import { validateToken } from 'middlewares/validateToken';
import { User } from 'user/user.model';
import { LoginQueryParams } from './auth.types';

export const authRouter = express.Router();

authRouter.get('/login', async (req, res) => {
  try {
    const { email, password } = req.query as LoginQueryParams;

    if (!email || !password) return res.sendStatus(400);

    const user = await User.findByCredentials(email, password);

    if (!user) return res.sendStatus(401);

    const token = await user.generateAuthToken();

    res.send({ token, user: _.pick(user, '_id', 'email', 'fullName', 'role') });
  } catch (error) {
    res.status(400).send(error);
  }
});

authRouter.get('/profile', validateToken, async (req, res) => {
  res.send({ user: req.user });
});
