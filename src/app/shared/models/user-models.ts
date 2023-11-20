export class User {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public userGroup: UserRole,
    public token: string) {}
}

export interface UsersManagementDto {
  id: number,
  login: string,
  email: string,
  userRole: UserRole,
}

export interface UsersManagementEditDto {
  id: number,
  login: string,
  email: string,
  fullname: string,
  userRole: UserRole,
}

export interface UsersManagementCreateDto {
  id: number,
  login: string,
  email: string,
  password: string,
  fullname: string,
  userRole: UserRole,
}

export interface UserDto {
  login: string,
  email: string,
  fullName: string,
  created: Date
}

export interface UserEditDto {
  id: number;
  email: string,
  fullName: string
}

export interface UserCredentialsDto {
  login: string;
  password: string;
}

export interface UserRegisterDto {
  login: string,
  password: string,
  email: string,
  fullname: string,
  created: Date,
  userRole: string,
}

export interface UserAuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}

export enum UserRole {
  Administrator = "Administrator",
  User = "User"
}
