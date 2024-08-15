"use client";

import { BeatLoader } from "react-spinners";

import styles from "./Loader.module.css";
import { LoaderProps } from "./Loader.props";

export default (props: LoaderProps) => {
  const { disabled } = props;

  return (
    <div className={styles.loading}>
      <BeatLoader color={disabled ? "#565959" : "#ffd814"} />
    </div>
  );
};
