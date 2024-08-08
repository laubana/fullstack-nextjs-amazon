import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import styles from "./Header.module.css";
import Delivery from "../Delivery";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Select from "@/components/Search";
import Text from "@/components/Text";

const User = async () => {
  const session = await getServerSession(authOptions);

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  if (session && session.user) {
    return (
      <div style={{ position: "relative" }}>
        <Link href="/profile">
          <div>
            <Text color="white" size={12}>
              Hello, {session.user.name}
            </Text>
            <Text color="white" weight={700}>
              Account & Lists <FaChevronDown size={8} />
            </Text>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <Link href="/auth/sign-in">
          <div>
            <Text color="white">Hello, sign in</Text>
            <Text color="white" weight={700}>
              Account & Lists
            </Text>
          </div>
        </Link>
      </div>
    );
  }
};

export default () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={30}
          style={{ margin: "8px 0" }}
        />
      </Link>
      {/* <Delivery /> */}
      <Select
        options={[
          { value: "test1", label: "Test 1" },
          { value: "test2", label: "Test 2" },
          { value: "test3", label: "Test 3" },
          { value: "test4", label: "Test 4" },
          { value: "test5", label: "Test 5" },
        ]}
      />
      <User />
      <Link href="/">
        <div>
          <Text color="white">Returns</Text>
          <Text color="white" weight={700}>
            & Orders
          </Text>
        </div>
      </Link>
      <Link href="/">
        <Text color="white" weight={700}>
          Cart
        </Text>
      </Link>
    </header>
  );
};
