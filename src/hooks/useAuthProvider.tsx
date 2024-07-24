import { type AuthProvider } from "@refinedev/core";
import { LoginMethod, type loginOptions } from "@types";
import { SessionContextValue, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = Pick<SessionContextValue, "data" | "status">;

export const useAuthProvider = (props: Props) => {
  const { data, status } = props;
  const to = usePathname();

  const authProvider: AuthProvider = {
    login: async ({ email, password, loginMethod }: loginOptions) => {
      if (loginMethod === LoginMethod.Google) {
        const result = await signIn("google", {
          callbackUrl: to ? to.toString() : "/",
          redirect: true,
        });
        if (result?.error) {
          return {
            success: false,
            error: {
              message: "Login failed",
              name: "Invalid login",
            },
          };
        }
      } else {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result?.error) {
          return {
            success: false,
            error: {
              message: "Login failed",
              name: "Invalid email or password",
            },
          };
        }
      }

      return {
        success: true,
        redirectTo: "/",
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async (context) => {
      console.log({ context });
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
    getPermissions: async () => {
      return null;
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
