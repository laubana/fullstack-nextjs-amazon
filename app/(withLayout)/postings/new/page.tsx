import styles from "./page.module.css";

import PostingForm from "@/components/PostingForm";
import Text from "@/components/Text";

import { getAllCategories } from "@/controllers/category";

export default async () => {
  const categories = await getAllCategories();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Text style={{ fontSize: "28px" }}>Post Your Products</Text>
        <PostingForm categories={categories.data} />
      </div>
    </div>
  );
};
