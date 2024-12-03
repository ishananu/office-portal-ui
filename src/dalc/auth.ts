import errorStore from '../app/store/error-store';
import { ILogin, IResponse, IUser } from '../app/type';
import { authRepo } from '../repo';

export function userLogin(
  username: string,
  password: string
): Promise<IResponse<ILogin>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => authRepo.userLogin(username, password),
    'local.error.title',
    ''
  );
}

export function userRegister(
  userData: Partial<IUser>
): Promise<IResponse<IUser>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => authRepo.userSignup(userData),
    'local.error.title',
    ''
  );
}

export function validateToken(token: string): Promise<IResponse<boolean>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => authRepo.validateToken(token),
    'local.error.title',
    ''
  );
}

export function refreshToken(token: string): Promise<IResponse<boolean>> {
  // const local = localizationStore.currentLocal.actions;
  return errorStore.wrap(
    () => authRepo.refreshToken(token),
    'local.error.title',
    ''
  );
}
