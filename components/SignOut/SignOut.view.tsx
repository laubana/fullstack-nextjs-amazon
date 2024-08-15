"use client";

import { signOut } from "next-auth/react";

import { SignOutProps } from "./SignOut.props";

import Button from "@/components/Button";

export default (props: SignOutProps) => {
  const {} = props;

  const handleClick = async () => {
    await signOut();
  };

  return <Button onClick={handleClick}>Sign Out</Button>;
};
