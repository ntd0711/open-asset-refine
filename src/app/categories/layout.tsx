import { Layout as BaseLayout } from "@components/layout";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  // const data = await getData();
  // console.log("this run on server");
  // console.log(data);
  // if (!data.session?.user) {
  //   return redirect("/login");
  // }

  return <BaseLayout>{children}</BaseLayout>;
}
