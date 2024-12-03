import ROUTES from '../app/routes';
import { ILogin, IResponse, IUser } from '../app/type';
import { post } from './fetches';

export async function userLogin(
  username: string,
  password: string
): Promise<IResponse<ILogin>> {
  return await post<IResponse<ILogin>>(`${ROUTES.AUTH}/login`, {
    username,
    password
  });
}

export async function userSignup(
  userData: Partial<IUser>
): Promise<IResponse<IUser>> {
  return await post<IResponse<IUser>>(`${ROUTES.AUTH}/signup`, userData);
}

export async function validateToken(
  token: string
): Promise<IResponse<boolean>> {
  return await post<IResponse<boolean>>(`${ROUTES.AUTH}/validate`, {
    token
  });
}

export async function refreshToken(token: string): Promise<IResponse<boolean>> {
  return await post<IResponse<boolean>>(`${ROUTES.AUTH}/refresh`, {
    token
  });
}
