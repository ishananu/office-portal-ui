import ROUTES from '../app/routes';
import { IResponse, IUser } from '../app/type';
import { DEFAULT_ROW_COUNT } from '../config/const';
import { get } from './fetches';

export async function getEmpList(
  pageNumber: number
): Promise<IResponse<IUser[]>> {
  return await get<IResponse<IUser[]>>(ROUTES.EMPLOYEES, {
    skip: pageNumber,
    limit: DEFAULT_ROW_COUNT
  });
}
