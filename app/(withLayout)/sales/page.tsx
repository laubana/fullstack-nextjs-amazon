import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import styles from "./page.module.css";

import { authOptions } from "@/configs/authOptions";

import SaleList from "@/components/SaleList";

export default async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SaleList />
      </div>
    </div>
  );
};
