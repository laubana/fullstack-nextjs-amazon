import styles from "./ProfileMenu.module.css";
import { ProfileMenuProps } from "./ProfileMenu.props";
import Text from "@/components/Text";

export default (props: ProfileMenuProps) => {
  const { description, title } = props;

  return (
    <div className={styles.container}>
      <Text style={{ fontSize: "17px" }}>{title}</Text>
      <Text color="grey">{description}</Text>
    </div>
  );
};
