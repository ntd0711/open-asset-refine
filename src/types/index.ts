// export enum Provider {
//   Google = "google",
//   Credentials = "credentials",
// }
export type Provider = "google" | "credentials";

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

export enum Role {
  Admin = "admin",
  User = "user",
}

// export enum RoleType {
//   Admin = 1,
//   User = 2,
// }

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
