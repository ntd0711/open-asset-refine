import type { Metadata } from "next";
import React, { Suspense } from "react";
import { RefineContext } from "./_refine_context";

export const metadata: Metadata = {
  title: "Open Assets",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <Suspense>
            <RefineContext>{children}</RefineContext>
          </Suspense>
        </main>
        <script
          src="https://accounts.google.com/gsi/client?hl=ja"
          async
          defer
        ></script>
      </body>
    </html>
  );
}
