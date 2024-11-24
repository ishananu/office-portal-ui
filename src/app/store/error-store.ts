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
