export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: User;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  message: string;
  user: User;
};


