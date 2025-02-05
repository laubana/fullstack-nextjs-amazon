import { ChangeEvent, FocusEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCircleXmark } from "react-icons/fa6";

import styles from "./InputPassword.module.css";
import { InputPasswordProps } from "./InputPassword.props";

import Text from "@/components/Text";

export default (props: InputPasswordProps): JSX.Element => {
  const {
    error,
    label,
    password,
    placeholder,
    setPassword = () => null,
    size = "medium",
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleToggle = () => {
    setVisibility((oldValue) => !oldValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleReset = () => {
    setPassword("");
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
        {visibility ? (
          <input
            className={`${styles.input} ${styles[`font-${size}`]}}`}
            onChange={handleChange}
            placeholder={placeholder}
            tabIndex={0}
            type="text"
            value={password}
          />
        ) : (
          <input
            className={`${styles.input} ${styles[`font-${size}`]}}`}
            onChange={handleChange}
            placeholder={placeholder}
            tabIndex={0}
            type="password"
            value={password}
          />
        )}
        {isFocused && (
          <div
            className={styles["component-container"]}
            tabIndex={1}
            onClick={handleReset}
          >
            <FaRegCircleXmark color="grey" />
          </div>
        )}
        {visibility ? (
          <div
            className={styles["component-container"]}
            tabIndex={1}
            onClick={handleToggle}
          >
            <FaEye color="grey" />
          </div>
        ) : (
          <div
            className={styles["component-container"]}
            tabIndex={1}
            onClick={handleToggle}
          >
            <FaEyeSlash color="grey" />
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
