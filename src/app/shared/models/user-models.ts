export class User {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public userGroup: UserRole,
    public token: string) {}
}

export interface UserDTO {
  login: string,
  email: string,
  fullName: string,
  created: Date
}

export interface UserEditDTO {
  id: number;
  email: string,
  fullName: string
}

export interface UserCredentialsDTO {
  login: string;
  password: string;
}

export interface UserRegisterDTO {
  login: string,
  password: string,
  email: string,
  fullName: string,
  created: Date,
  userRole: string,
}

export interface UserAuthResponseDTO {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}

export enum UserRole {
  Administrator = "Administrator",
  User = "User"
}
