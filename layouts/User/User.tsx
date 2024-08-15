"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import styles from "./User.module.css";

import SignOut from "@/components/SignOut";
import Text from "@/components/Text";

export default () => {
  const session = useSession();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <>
      {session.status === "loading" ? null : session.status ===
          "authenticated" &&
        session.data &&
        session.data.user ? (
        <div
          onMouseOut={() => setIsVisible(false)}
          onMouseOver={() => setIsVisible(true)}
        >
          <Link href="/profile">
            <div>
              <Text color="white" size="small">
                Hello, {session.data.user.name}
              </Text>
              <Text color="white" weight="bold">
                Account & Lists <FaChevronDown size={8} />
              </Text>
            </div>
          </Link>
          {isVisible ? (
            <div className={styles.modal}>
              <SignOut />
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <Link href="/auth/sign-in">
            <div>
              <Text color="white">Hello, sign in</Text>
              <Text color="white" weight="bold">
                Account & Lists
              </Text>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
