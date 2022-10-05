export interface UserCredentialsDTO {
  login: string;
  password: string;
}

export interface UserAuthResponseDTO {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}
