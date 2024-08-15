"use client";

import { SessionProvider } from "next-auth/react";

export default (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
};
