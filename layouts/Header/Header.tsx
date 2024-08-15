import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";

import Select from "@/components/Search";
import Text from "@/components/Text";

import { getAllCategories } from "@/controllers/category";

import Delivery from "@/layouts/Delivery";
import User from "@/layouts/User/User";

import { Category } from "@/types/Category";

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
      <Link href="/orders">
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
