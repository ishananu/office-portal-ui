export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  password?: string;
  createdAt?: string;
}

export interface ILogin {
  token: string;
  name: string;
  id: string;
}

export interface IPagination {
  limit: number;
  skip: number;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
}
