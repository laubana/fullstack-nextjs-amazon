import { FaChevronDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./Search.module.css";
import { SelectProps } from "./Search.props";
import Text from "../Text";

export default (props: SelectProps) => {
  const { options } = props;

  return (
    <form className={styles.container}>
      <div className={styles["select-container"]}>
        <div className={styles["category-container"]}>
          <Text color="#555" size={12}>
            All <FaChevronDown color="#555" size={8} />
          </Text>
        </div>
        <select className={styles.select} defaultValue={""}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.input} placeholder="Search" />
      <button className={styles.button} type="button">
        <IoSearchOutline size={24} />
      </button>
    </form>
  );
};
