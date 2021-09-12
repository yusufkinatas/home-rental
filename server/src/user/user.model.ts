import { model, Model, Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from './user.types';
import { envVariables } from 'envVariables';

export type UserDocument = Document<any, any, IUser> & IUser & UserMethods;

interface UserMethods {
  generateAuthToken: () => Promise<string>;
}

interface UserModel extends Model<IUser, unknown, UserMethods> {
  findByCredentials: (email: string, password: string) => Promise<UserDocument>;
}

const schema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,

    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email address',
    },
  },
  fullName: { type: String, required: true, trim: true },
  role: { type: Number, required: true, enum: [0, 1, 2] },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
});

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } else {
    next();
  }
});

schema.static('findByCredentials', async (email: string, password: string) => {
  const foundUser = await User.findOne({ email });
  if (!foundUser) return Promise.reject('Invalid credentials');

  const passwordCorrect = await bcrypt.compare(password, foundUser.password);

  if (!passwordCorrect) return Promise.reject('Invalid credentials');

  return foundUser;
});

schema.method('generateAuthToken', async function () {
  const token = await jwt.sign({ _id: this._id.toHexString() }, envVariables.JWT_SECRET).toString();

  return token;
});

export const User = model<IUser, UserModel>('User', schema);
