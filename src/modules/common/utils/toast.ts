import t, { Renderable, ValueOrFunction } from 'react-hot-toast';

export const toast = {
  success: (message: string): string =>
    t.success(message, {
      style: { backgroundColor: '#252C2C', color: '#E7E7E7' },
    }),
  loading: (message: string): string =>
    t.loading(message, {
      style: { backgroundColor: '#252C2C', color: '#E7E7E7' },
    }),
  error: (message: string): string =>
    t.error(message, {
      style: { backgroundColor: '#252C2C', color: '#E7E7E7' },
    }),
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;
      error: ValueOrFunction<Renderable, unknown>;
    },
  ): Promise<T> =>
    t.promise<T>(promise, msgs, {
      style: { backgroundColor: '#252C2C', color: '#E7E7E7' },
    }),
  dismiss: (toastId: string): void => t.dismiss(toastId),
};
