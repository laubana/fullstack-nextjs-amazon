"use client";

import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default () => {
  return (
    <div className={styles.loading}>
      <BeatLoader color="#E32195" />
    </div>
  );
};
