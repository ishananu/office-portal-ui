export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  password?: string;
  createdAt?: string;
  img?: string;
}

export interface ILogin {
  token: string;
  name: string;
  id: string;
  refreshToken: string;
  email?: string;
  img: string;
}

export interface IPagination {
  limit: number;
  skip: number;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
}

interface IPaginativeQuery<T> {
  data: T;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginativeResponse<T>
  extends IResponse<IPaginativeQuery<T>> {}

export enum EResponseCode {
  'UNAUTHORIZED' = 401,
  'SUCCESS' = 200,
  'ERROR' = 500,
  'FORBIDDEN' = 403,
  'TOKEN_EXPIRED' = 402,
  'BAD_REQUEST' = 400
}
