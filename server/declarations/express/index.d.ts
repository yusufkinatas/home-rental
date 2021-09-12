declare namespace Express {
  interface Request {
    user: {
      _id: string;
      email: string;
      fullName: string;
      role: UserRole;
    };
  }
}
