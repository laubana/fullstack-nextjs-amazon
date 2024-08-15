import { FaCopyright } from "react-icons/fa";

import styles from "./Footer.module.css";

import Text from "@/components/Text";

export default async () => {
  return (
    <footer className={styles.footer}>
      <Text color="white">
        <FaCopyright />
      </Text>
      <Text color="white">2024, Yuhwan Ban</Text>
    </footer>
  );
};
