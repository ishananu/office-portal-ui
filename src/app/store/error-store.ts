import { addToast } from '../features/toast/toastSlice';
import { EResponseCode } from '../type';
import { AppDispatch, store } from './redux-store';

type ErrorDetails = {
  title: string;
  text: string;
  error: unknown;
};

export const reportError = ({ title, text, error }: ErrorDetails): void => {
  console.error(`[Error]: ${title}`, {
    message: text,
    details: error
  });
};

const errorStore = {
  async wrap<T>(
    inner: () => Promise<T>,
    errorTitle: string,
    errorMsg: string
  ): Promise<T> {
    try {
      return await inner();
    } catch (e) {
      if ((e as any)?.status === EResponseCode.ERROR) {
        (store.dispatch as AppDispatch)(
          addToast({
            type: 'danger',
            message:
              (e as any)?.response.data.message || 'Something went wrong!',
            duration: 5000
          })
        );
      }

      reportError({
        title: errorTitle,
        text: errorMsg,
        error: e
      });
      throw e;
    }
  }
};

export default errorStore;
