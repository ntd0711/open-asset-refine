import { auth } from "@auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  // const session = await auth();

  // if (session?.user) {
  //   return redirect("/");
  // }

  return <>{children}</>;
}
