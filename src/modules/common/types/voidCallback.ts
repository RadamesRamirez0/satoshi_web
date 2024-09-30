export type VoidCallback = () => void | Promise<void>;

export type VoidParamCallback<T> = (param: T) => void | Promise<void>;
