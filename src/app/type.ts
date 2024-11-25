export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: string;
}

export interface IPagination {
  limit: number;
  skip: number;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
}
