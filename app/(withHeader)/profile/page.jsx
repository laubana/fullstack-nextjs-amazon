import Link from "next/link";
import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import ProfileMenu from "@/components/ProfileMenu";
import Text from "@/components/Text";

const menus = [
  {
    description:
      "Track, return, cancel an order, download invoice or buy again",
    href: "/orders",
    title: "Your Orders",
  },
  {
    description: "Manage or add payment methods and view your transactions",
    href: "/payments",
    title: "Your Payments",
  },
  {
    description: "Post your products for sale and manage your postings",
    href: "/postings/new",
    title: "Post Your Products",
  },
];

const admins = [
  {
    description: "Add category",
    href: "/admin/categories/new",
    title: "Add Category",
  },
];

export default async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Text style={{ fontSize: "28px" }}>Your Account</Text>
        <div className={styles.grid}>
          {menus.map((menu) => (
            <Link href={menu.href} key={menu.href}>
              <ProfileMenu description={menu.description} title={menu.title} />
            </Link>
          ))}
          {session && session.user.role === "admin" ? (
            <>
              {admins.map((admin) => (
                <Link href={admin.href} key={admin.href}>
                  <ProfileMenu
                    description={admin.description}
                    title={admin.title}
                  />
                </Link>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
