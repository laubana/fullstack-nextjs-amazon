export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
};

export type UserFormValues = {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
};
