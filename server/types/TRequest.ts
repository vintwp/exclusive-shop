type TRequest<T = unknown, K = unknown> = Express.Request & {
  body: T;
  params: K;
};

export { TRequest };