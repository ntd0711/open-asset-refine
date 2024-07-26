"use client";
import { auth } from "@auth";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  // const session = await auth();
  const session = useSession();

  console.log(session);

  return <div>Home page</div>;
}
