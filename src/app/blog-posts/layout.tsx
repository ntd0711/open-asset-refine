import { auth } from "@auth";
import { Layout as BaseLayout } from "@components/layout";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}
