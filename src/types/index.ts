export enum Provider {
  Google = "google",
  Credentials = "credentials",
}

export type loginOptions =
  | {
      providerName: "credentials";
      email: string;
      password: string;
    }
  | {
      providerName: Exclude<Provider, "credentials">;
      email?: string;
      password?: string;
    };
