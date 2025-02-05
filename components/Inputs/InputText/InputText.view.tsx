"use client";

import { ChangeEvent, FocusEvent, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

import styles from "./InputText.module.css";
import { InputTextProps } from "./InputText.props";

import Text from "@/components/Text";

export default (props: InputTextProps) => {
  const {
    error,
    label,
    placeholder,
    setText = () => null,
    size = "medium",
    text,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleReset = () => {
    setText("");
  };

  return (
    <div className={styles.container}>
      {label && (
        <div>
          <Text size={size}>{label}</Text>
        </div>
      )}
      <div
        className={`${styles["input-container"]} ${styles[`padding-${size}`]}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          className={`${styles.input} ${styles[`font-${size}`]}}`}
          onChange={handleChange}
          placeholder={placeholder}
          tabIndex={0}
          type="text"
          value={text}
        />
        {isFocused && (
          <div
            className={styles["component-container"]}
            tabIndex={1}
            onClick={handleReset}
          >
            <FaRegCircleXmark color="grey" />
          </div>
        )}
      </div>
      {error && (
        <div>
          <Text color="red" size={size}>
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};
