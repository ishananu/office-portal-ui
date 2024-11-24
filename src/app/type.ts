export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IPagination {
  limit: number;
  skip: number;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
}
