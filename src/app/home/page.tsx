import { auth } from "@auth";
import { Suspense } from "react";
export default async function PublicPage() {
  const session = await auth();
  return (
    <Suspense>
      <div>Home page</div>
      {JSON.stringify(session)}
    </Suspense>
  );
}
