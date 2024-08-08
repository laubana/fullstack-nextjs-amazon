export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
};

export type UserForm = {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
};

export type UserPayload = {
  email: string;
  name: string;
  password: string;
};
