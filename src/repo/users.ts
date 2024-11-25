import ROUTES from '../app/routes';
import { IResponse, IUser } from '../app/type';
import { DEFAULT_ROW_COUNT } from '../config/const';
import { get, post, put, del } from './fetches';

export async function getEmpList(
  pageNumber: number
): Promise<IResponse<IUser[]>> {
  return await get<IResponse<IUser[]>>(ROUTES.EMPLOYEES, {
    skip: pageNumber,
    limit: DEFAULT_ROW_COUNT
  });
}

export async function putEmp(data: Partial<IUser>): Promise<IResponse<IUser>> {
  const { _id, ...body } = data;
  return await put<IResponse<IUser>>(`${ROUTES.EMPLOYEES}/${_id}`, body);
}

export async function postEmp(data: Partial<IUser>): Promise<IResponse<IUser>> {
  const { _id, ...body } = data;
  return await post<IResponse<IUser>>(ROUTES.EMPLOYEES, body);
}

export async function deleteEmp(userId: string): Promise<IResponse<IUser>> {
  return await del<IResponse<IUser>>(`${ROUTES.EMPLOYEES}/${userId}`);
}
