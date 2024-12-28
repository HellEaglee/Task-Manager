import { User } from "./commonTypes";

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignInValues {
  email: string;
  password: string;
}
