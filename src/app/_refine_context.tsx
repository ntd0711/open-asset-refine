"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { useAuthProvider } from "@hooks/useAuthProvider";
import { appDataProvider } from "@providers/dataProvider";
import { DevtoolsProvider } from "@refinedev/devtools";
import "@styles/global.css";

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
      <DevtoolsProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={appDataProvider()}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              reactQuery: {
                clientConfig: {
                  defaultOptions: {
                    queries: {
                      staleTime: 5000,
                    },
                  },
                },
              },
            }}
          >
            {props.children}
            {/* <DevtoolsPanel /> */}
            <RefineKbar />
          </Refine>
        </RefineKbarProvider>
      </DevtoolsProvider>
    </>
  );
};
