"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

import styles from "./Search.module.css";
import { SelectProps } from "./Search.props";

import Text from "@/components/Text";

import { useStore } from "@/configs/store";

export default (props: SelectProps) => {
  const { options } = props;

  const router = useRouter();

  const store = useStore();

  const categoryId = store.categoryId;
  const categoryName = store.categoryName;

  const [inputCategoryId, setInputCategoryId] = useState<string>(categoryId);
  const [inputCategoryName, setInputName] = useState<string>(categoryName);
  const [inputProductName, setInputProductName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputCategoryId(event.target.value);
    setInputName(
      options.find((option) => option.value === event.target.value)?.label ??
        "All"
    );
  };

  const handleClick = () => {
    store.setCategoryId(inputCategoryId);
    store.setCategoryName(inputCategoryName);
    store.setProductName(inputProductName);
    router.push("/");
  };

  return (
    <form className={styles.container}>
      <div className={styles["select-container"]}>
        <div className={styles["category-container"]}>
          <Text
            alignment="center"
            color="grey"
            size="small"
            style={{ gap: "8px" }}
          >
            {inputCategoryName} <FaChevronDown size={8} />
          </Text>
        </div>
        <select
          className={styles.select}
          onChange={handleChange}
          value={inputCategoryId}
        >
          <option value="">All</option>
          {options.map((option) => (
            <option
              className={styles.option}
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <input
        className={styles.input}
        onChange={(event) => setInputProductName(event.target.value)}
        placeholder="Search"
        value={inputProductName}
      />
      <button className={styles.button} onClick={handleClick} type="button">
        <IoSearchOutline size={24} />
      </button>
    </form>
  );
};
