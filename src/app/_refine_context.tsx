"use client";

import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { useAuthProvider } from "@hooks/useAuthProvider";
import "@styles/global.css";
import { appDataProvider } from "@providers/dataProvider";

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const authProvider = useAuthProvider({ data, status });

  if (status === "loading") {
    return <span>loading...</span>;
  }

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={appDataProvider}
          authProvider={authProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          {props.children}
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </>
  );
};
