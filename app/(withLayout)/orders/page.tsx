import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import styles from "./page.module.css";

import OrderList from "@/components/OrderList";

import { authOptions } from "@/configs/authOptions";

export default async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <OrderList />
      </div>
    </div>
  );
};
