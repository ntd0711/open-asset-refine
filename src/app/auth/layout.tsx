import Header from "@components/auth/Header";
import React from "react";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <section className="bg-[#F7F7F7] h-[100vh]">
      <Header />
      {children}
    </section>
  );
}
