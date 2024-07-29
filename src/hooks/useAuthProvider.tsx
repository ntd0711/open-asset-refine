import { signInWithCredentials, signInWithGoogle } from "@actions/login";
import { AuthActionResponse, type AuthProvider } from "@refinedev/core";
import { DEFAULT_LOGIN_REDIRECT_PATH } from "@routes";
import { Provider, type loginOptions } from "@types";
import { AuthError } from "next-auth";
import { SessionContextValue, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
type Props = Pick<SessionContextValue, "data" | "status">;

export const useAuthProvider = (props: Props) => {
  const { data, status } = props;
  const to = usePathname();

  const authProvider: AuthProvider = {
    login: async ({
      email,
      password,
      providerName,
    }: loginOptions): Promise<AuthActionResponse> => {
      let response;
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
          console.log("login success");
          return {
            success: true,
            redirectTo: DEFAULT_LOGIN_REDIRECT_PATH,
          };
        }
        return {
          success: false,
        };
      } catch (error) {
        console.log("errorrrr>>>>", error);
        return {
          success: false,
        };
      }
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/auth/login",
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
