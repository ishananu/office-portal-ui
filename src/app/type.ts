export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  password?: string;
  createdAt?: string;
}

export interface ILogin extends Omit<IUser, 'password' | 'createdAt'> {}

export interface IPagination {
  limit: number;
  skip: number;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
}
