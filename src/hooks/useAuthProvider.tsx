import { logout } from "@actions/logout";
import { AuthActionResponse, type AuthProvider } from "@refinedev/core";
import { DEFAULT_LOGIN_REDIRECT_PATH } from "@routes";
import { type LoginOptions } from "@types";
import { SessionContextValue, signIn } from "next-auth/react";

type Props = Pick<SessionContextValue, "data" | "status">;

export const useAuthProvider = (props: Props) => {
  const { data, status } = props;

  const authProvider: AuthProvider = {
    login: async ({
      email,
      password,
      providerName,
    }: LoginOptions): Promise<AuthActionResponse> => {
      let response = undefined;
      try {
        if (providerName === "credentials") {
          response = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
        } else {
          response = await signIn("google", { redirect: false });
        }

        if (response?.ok) {
          return {
            success: true,
            // redirectTo: DEFAULT_LOGIN_REDIRECT_PATH,
          };
        }
        return {
          success: false,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
        };
      }
    },
    logout: async () => {
      try {
        // using server action that supports destroy cookie
        await logout();
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
        };
      }
    },
    onError: async (error) => {
      if (error.status === 401 || error.status === 403) {
        return {
          logout: true,
          redirectTo: "auth/login",
          error,
        };
      }
      return {};
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
      return {
        authenticated: true,
      };
    },
    getPermissions: async (params) => {
      return ["admin"];
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return authProvider;
};
