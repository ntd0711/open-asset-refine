"use client";

import { Suspense } from "react";
import { Layout as BaseLayout } from "@components/layout";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <NavigateToResource />
        <BaseLayout>
          <div>Home page</div>
        </BaseLayout>
        ;
      </Authenticated>
    </Suspense>
  );
}
