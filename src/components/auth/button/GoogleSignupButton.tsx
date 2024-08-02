import React, { FC } from "react";

type Props = object;

export const GoogleSignUpButton: FC<Props> = (props) => {
  return (
    <div
      {...props}
      id="g_id_onload"
      className="g_id_signin"
      data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}
    />
  );
};
