import { Response, NextFunction, Request } from 'express';
import { UserRole } from 'user/user.types';

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== UserRole.ADMIN) return res.sendStatus(401);

  next();
};
