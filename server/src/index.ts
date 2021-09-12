import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from 'user';
import { authRouter } from 'auth';
import { apartmentRouter } from 'apartment';
import mongoose from 'mongoose';
import { searchRouter } from 'search';
import { envVariables } from 'envVariables';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/apartment', apartmentRouter);
app.use('/search', searchRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(envVariables.PORT, async () => {
  await mongoose.connect(envVariables.MONGODB_URI);
  console.log(`Server started at http://localhost:${envVariables.PORT}`);
});
