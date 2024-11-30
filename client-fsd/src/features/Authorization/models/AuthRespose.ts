type Error = {
  error: boolean;
  errorMessage: string;
};

type Ok = {
  ok: boolean;
};

export type AuthResponse = Error | Ok;
