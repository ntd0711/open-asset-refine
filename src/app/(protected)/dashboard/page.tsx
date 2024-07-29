"use client";
import { useOne } from "@refinedev/core";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const session = useSession();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: 1,
  });

  return (
    <div>
      <span>dashboard page</span>
      {JSON.stringify(session)}
    </div>
  );
}
