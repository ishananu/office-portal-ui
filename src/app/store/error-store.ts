import { addToast } from '../features/toast/toastSlice';
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
      (store.dispatch as AppDispatch)(
        addToast({
          type: 'danger',
          message: 'Something went wrong!',
          duration: 5000
        })
      );
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
