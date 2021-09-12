import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ?? '',
};
