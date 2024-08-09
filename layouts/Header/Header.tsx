import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import styles from "./Header.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Select from "@/components/Search";
import Text from "@/components/Text";
import Delivery from "@/layouts/Delivery";
import { getAllCategories } from "@/services/category";
import { Category } from "@/types/Category";

const User = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    return (
      <div style={{ position: "relative" }}>
        <Link href="/profile">
          <div>
            <Text color="white" size="small">
              Hello, {session.user.name}
            </Text>
            <Text color="white" weight="bold">
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
            <Text color="white" weight="bold">
              Account & Lists
            </Text>
          </div>
        </Link>
      </div>
    );
  }
};

export default async () => {
  const categoriesResponse = await getAllCategories();

  const categories = categoriesResponse.data as Category[];

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
        options={categories.map((category) => ({
          label: category.name,
          value: category._id,
        }))}
      />
      <User />
      <Link href="/">
        <div>
          <Text color="white">Returns</Text>
          <Text color="white" weight="bold">
            & Orders
          </Text>
        </div>
      </Link>
      <Link href="/carts">
        <Text color="white" weight="bold">
          Cart
        </Text>
      </Link>
    </header>
  );
};
