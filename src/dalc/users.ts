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

export function updateEmployee(
  userData: Partial<IUser>
): Promise<IResponse<IUser>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => usersRepo.putEmp(userData),
    'local.error.title',
    ''
  );
}

export function addEmployee(
  userData: Partial<IUser>
): Promise<IResponse<IUser>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => usersRepo.postEmp(userData), // this need be change with proper handling, need to pass from the signup page
    'local.error.title',
    ''
  );
}

export function deleteEmployee(userId: string): Promise<IResponse<IUser>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => usersRepo.deleteEmp(userId), // this need be change with proper handling, need to pass from the signup page
    'local.error.title',
    ''
  );
}
