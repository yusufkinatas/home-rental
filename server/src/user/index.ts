import express from 'express';
import { validateAdmin } from 'middlewares/validateAdmin';
import { validateToken } from 'middlewares/validateToken';
import { CreateUserBody, UpdateUserBody, UserRole } from './user.types';
import { User } from './user.model';
import _ from 'lodash';

export const userRouter = express.Router();

userRouter.get('/:id', validateToken, validateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.sendStatus(404);

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const createParams = _.pick<CreateUserBody>(req.body, ['email', 'role', 'password', 'fullName']);
    const { email, role } = createParams;

    if (role !== UserRole.CLIENT && role !== UserRole.REALTOR) return res.sendStatus(400);

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(401).send('Email is already in use');

    const user = await User.create(createParams);

    const token = await user.generateAuthToken();

    res.send({ token, user: _.pick(user, '_id', 'email', 'fullName', 'role') });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.put('/:id', validateToken, validateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updateParams = _.pick<UpdateUserBody>(req.body, ['email', 'fullName']);

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) return res.sendStatus(404);

    if (updateParams.email) {
      const existingUser = await User.findOne({ email: updateParams.email });

      if (existingUser && existingUser._id.toString() !== id) return res.status(400).send('Email is already in use');
    }

    userToUpdate.set(updateParams);

    const updatedUser = await userToUpdate.save();

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(400);
  }
});

userRouter.delete('/:id', validateToken, validateAdmin, async (req, res) => {
  const { id } = req.params;

  const userToDelete = await User.findById(id);

  if (!userToDelete) return res.sendStatus(404);

  const isDeletingSelf = userToDelete._id.toString() === req.user._id.toString();

  if (isDeletingSelf) return res.sendStatus(401);

  await userToDelete.delete();

  res.send(userToDelete);
});
