import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import styles from "./page.module.css";

import CategoryForm from "@/components/CategoryForm";
import Text from "@/components/Text";

import { authOptions } from "@/configs/authOptions";

export default async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <Text style={{ fontSize: "28px" }}>Add Category</Text>
      <CategoryForm />
    </div>
  );
};
