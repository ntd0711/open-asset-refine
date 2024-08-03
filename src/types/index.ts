export type Provider = "google" | "credentials";

export type LoginOptions =
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

export type GoogleRegisterUser = {
  dataOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  userId: string; // unique
  credentials: string;
};

const googleResponse = {
  iss: "https://accounts.google.com",
  azp: "678767466351-jcbaf2s5lvhe2g5gest9i05jjdhaq1pn.apps.googleusercontent.com",
  aud: "678767466351-jcbaf2s5lvhe2g5gest9i05jjdhaq1pn.apps.googleusercontent.com",
  sub: "106271533828816323900",
  email: "ntd07112000@gmail.com",
  email_verified: true,
  nbf: 1722579601,
  name: "Tien Dat Nguyen",
  picture:
    "https://lh3.googleusercontent.com/a/ACg8ocKmkiYsx7lIUDD5RenoIdNTHqbPDQ2BgnRLcMDx4O9VLdQKbXKo=s96-c",
  given_name: "Tien Dat",
  family_name: "Nguyen",
  iat: 1722579901,
  exp: 1722583501,
  jti: "288576329640dd9e20c7c7148770c97e213d903c",
};

// type CredentialsRegisterUserSchema = {
//   dataOfBirth: {
//     day: number;
//     month: number;
//     year: number;
//   }
//   // unique
//   username: string;
//   email: string;
//   isNotification: boolean
//   followedAccounts: []

// }
