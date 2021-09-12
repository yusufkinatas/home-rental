import { envVariables } from 'envVariables';
import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from 'user/user.model';

interface TokenInterface {
  _id: string;
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    const decodedToken = jwt.verify(token, envVariables.JWT_SECRET) as TokenInterface;

    const user = await User.findById(decodedToken._id);

    if (!user) return res.sendStatus(401);

    req.user = { _id: user._id, fullName: user.fullName, role: user.role, email: user.email };

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
