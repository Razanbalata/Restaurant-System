export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  hasRestaurant: boolean; // الحقل الجديد
  restaurant?: { id: number; name: string } | null;
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
  role:string
};

export type SignupResponse = {
  message: string;
  user: User;
};


