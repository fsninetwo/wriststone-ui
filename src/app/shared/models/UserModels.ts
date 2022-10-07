export class User {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public userGroup: UserGroup,
    public token: string) {}
}

export interface UserDTO {
  login: string,
  email: string,
  fullName: string,
  created: Date
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
  userGroup: UserGroup,
}

export interface UserAuthResponseDTO {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}

export enum UserGroup {
  Administrator = 1,
  User
}
