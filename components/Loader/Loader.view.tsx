"use client";

import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default () => {
  return (
    <div className={styles.loading}>
      <BeatLoader color="#ffd814" />
    </div>
  );
};
