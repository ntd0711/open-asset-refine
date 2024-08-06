// "use client";
// import { HttpClient } from "@api/httpClient";
// import { auth } from "@auth";
// import { useList, useOne, usePermissions } from "@refinedev/core";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function IndexPage() {
//   const session = useSession();
//   const { data, isLoading, isError } = useList({
//     resource: "api/contacts?q=",
//   });
//   console.log({ data: data?.data });
//   // console.log({ data: data?.data });
//   // useEffect(() => {
//   //   (async () => {
//   //     const response = await HttpClient.get<any>(`/api/contacts?q=`);
//   //     console.log({ response: response.data.data });
//   //   })();
//   // }, []);

//   return (
//     <div>
//       <span>dashboard page</span>
//       {JSON.stringify(session)}
//     </div>
//   );
// }

import { HttpClient } from "@api/httpClient";
import { auth } from "@auth";
import { CookieToken } from "@constants/auth";
import { cookies } from "next/headers";

export default async function IndexPage() {
  const session = await auth();
  const accessToken = cookies().get(CookieToken)?.value;
  console.log({ accessToken });
  const response = await HttpClient.get<any>(`/api/contacts?q=`);
  console.log({ response: response });

  return (
    <div>
      <span>dashboard page</span>
      {JSON.stringify(session)}
    </div>
  );
}
