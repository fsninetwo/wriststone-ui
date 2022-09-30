export interface UserCredentialsDTO {
  login: string;
  password: string;
}

export interface UserAuthResponseDTO {
  isAuthSuccsessfull: boolean;
  token: string;
}
