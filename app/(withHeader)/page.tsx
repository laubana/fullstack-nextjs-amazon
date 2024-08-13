"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Loader from "@/components/Loader";
import PostingGrid from "@/components/PostingGrid";
import Text from "@/components/Text";
import { getAllProducts } from "@/services/product";
import { Product } from "@/types/Product";

export default () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      const response = await getAllProducts();

      setProducts(response.data as Product[]);

      setIsLoading(false);
    };
    main();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Text style={{ fontSize: "20px" }} weight="bold">
            Results
          </Text>
          <Text color="grey">
            Check each product page for other buying options.
          </Text>
          {isLoading ? <Loader /> : <PostingGrid products={products} />}
        </div>
      </div>
    </div>
  );
};
