// "use client";
import { auth } from "@auth";
import { useSession } from "next-auth/react";

export default async function IndexPage() {
  // const session = useSession();
  const session = await auth();

  return (
    <div>
      <span>dashboard page</span>
      {JSON.stringify(session)}
    </div>
  );
}
