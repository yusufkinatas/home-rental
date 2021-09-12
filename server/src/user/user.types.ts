export enum UserRole {
  CLIENT = 0,
  REALTOR = 1,
  ADMIN = 2,
}

export interface IUser {
  email: string;
  fullName: string;
  role: UserRole;
  password: string;
}

export interface CreateUserBody {
  email: string;
  fullName: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserBody {
  email: string;
  fullName: string;
}
