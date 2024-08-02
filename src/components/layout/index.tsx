"use client";

import { Menu } from "@components/menu";
import type { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <div>{children}</div>
      </div>
    </div>
  );
};
