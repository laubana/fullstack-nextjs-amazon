"use client";

import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import styles from "./AutoComplete.module.css";
import { AutoCompleteProps } from "./AutoComplete.props";
import Text from "@/components/Text";
import { Option } from "@/types/Option";

export default (props: AutoCompleteProps) => {
  const {
    error,
    label,
    options,
    option,
    placeholder,
    setOption,
    size = "medium",
  } = props;

  const [inputValue, setInputValue] = useState<string>(
    options.find((optionItem) => optionItem.value === option?.value)?.label ||
      ""
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const items = options
    .filter((option) =>
      option.label.toUpperCase().includes(inputValue?.toUpperCase() || "")
    )
    .map((option, index) => (
      <div
        className={`${styles["item-container"]} ${styles[`padding-${size}`]}`}
        tabIndex={2}
        onClick={() => handleSelect(option)}
        key={index}
      >
        <Text size={size}>{option.label}</Text>
      </div>
    ));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsVisible(true);
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setInputValue("");
    }
    setIsVisible(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsVisible(false);
    }
  };

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setIsVisible(false);
    setOption(option);
  };

  useEffect(() => {
    const option = options.find(
      (option) => option.label.toUpperCase() === inputValue.toUpperCase()
    );

    if (option) {
      setOption(option);
      setInputValue(option.label);
    } else {
      setOption(undefined);
    }
  }, [inputValue]);

  return (
    <div className={styles.container}>
      {label && (
        <div>
          <Text size={size}>{label}</Text>
        </div>
      )}
      <div onFocus={handleFocus} onBlur={handleBlur}>
        <div
          className={`${styles["input-container"]} ${
            styles[`padding-${size}`]
          }`}
        >
          <input
            className={`${styles.input} ${styles[`font-${size}`]}}`}
            onChange={handleChange}
            placeholder={placeholder}
            tabIndex={0}
            type="text"
            value={inputValue}
          />
          <div className={styles["component-container"]} tabIndex={1}>
            {isVisible ? (
              <FaChevronUp color="grey" />
            ) : (
              <FaChevronDown color="grey" />
            )}
          </div>
        </div>
        {isVisible && 0 < items.length && (
          <div className={styles["list-container"]}>{items}</div>
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
