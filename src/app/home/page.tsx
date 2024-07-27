"use client";
import { useOne } from "@refinedev/core";
import { Suspense } from "react";
interface User {
  id: 2;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function PublicPage() {
  return (
    <Suspense>
      <div>public page</div>
    </Suspense>
  );
}
