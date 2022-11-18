export class User {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public userGroup: UserRole,
    public token: string) {}
}

export interface UsersManagementDTO {
  id: number,
  login: string,
  email: string,
  userRole: UserRole,
}

export interface UsersManagementEditDTO {
  id: number,
  login: string,
  email: string,
  fullname: string,
  userRole: UserRole,
}

export interface UsersManagementCreateDTO {
  id: number,
  login: string,
  email: string,
  password: string,
  fullname: string,
  userRole: UserRole,
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
  fullname: string,
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
