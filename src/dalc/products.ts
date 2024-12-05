import errorStore from '../app/store/error-store';
import { IPaginativeResponse, IResponse, IUser } from '../app/type';
import { usersRepo } from '../repo';

export function getEmployeeList(
  page: number
): Promise<IPaginativeResponse<IUser[]>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => usersRepo.getEmpList(page),
    'local.error.title',
    ''
  );
}
