export interface UserSignupDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserSigninDto {
  email: string;
  password: string;
}
