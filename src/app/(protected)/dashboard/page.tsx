"use client";
import { HttpClient } from "@api/httpClient";
import { auth } from "@auth";
import { useOne, usePermissions } from "@refinedev/core";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  // const session = await auth();
  const session = useSession();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: 1,
  });

  console.log({ data: data?.data });

  return (
    <div>
      <span>dashboard page</span>
      {JSON.stringify(session)}
    </div>
  );
}
