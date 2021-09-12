import { Response, NextFunction, Request } from 'express';
import { UserRole } from 'user/user.types';

export const validateRealtorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === UserRole.CLIENT) return res.sendStatus(401);

  next();
};
