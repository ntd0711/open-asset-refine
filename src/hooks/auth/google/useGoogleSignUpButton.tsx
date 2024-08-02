import { useEffect } from "react";

export const useGoogleSignUpButton = (
  handleCredentialResponse: (response: { credential: string }) => void
) => {
  useEffect(() => {
    // if (window["google"] && !user) {
    if (window["google"]) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        login_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt();
      const googleLoginDiv: HTMLElement | null =
        document.getElementById("g_id_onload");
      window.google.accounts.id.renderButton(googleLoginDiv, {
        size: "large",
        width: "320px",
        locale: "ja",
        logo_alignment: "left",
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        login_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
        text: "signup_with",
      });
    }
  }, []);
};
