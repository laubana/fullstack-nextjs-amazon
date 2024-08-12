import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import CheckoutForm from "@/components/CheckoutForm";

export default async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CheckoutForm />
      </div>
    </div>
  );
};
