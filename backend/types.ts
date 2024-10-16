import {Model} from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  avatar: string | null;
  displayName: string;
  googleID?: string;
}

export interface Parameter {
  name: string;
  value: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;