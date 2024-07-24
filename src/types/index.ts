export enum LoginMethod {
  Google = "google",
  Credentials = "credentials",
}

export type loginOptions = {
  email?: string;
  password?: string;
  loginMethod: LoginMethod;
};
