"use client";

import "rc-slider/assets/index.css";

import { useEffect, useState } from "react";
import Slider from "rc-slider";

import styles from "./page.module.css";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import PostingGrid from "@/components/PostingGrid";
import Text from "@/components/Text";

import { useStore } from "@/configs/store";

import { getAllProducts } from "@/controllers/product";

import { Product } from "@/types/Product";

export default () => {
  const store = useStore();

  const categoryId = store.categoryId;
  const productName = store.productName;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [rangedProducts, setRangedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFiltering, setIsFiltering] = useState<boolean>(true);
  const [isRanging, setIsRanging] = useState<boolean>(true);
  const [currentMin, setCurrentMin] = useState<number>(0);
  const [currentMax, setCurrentMax] = useState<number>(0);
  const [searchMin, setSearchMin] = useState<number>(0);
  const [searchMax, setSearchMax] = useState<number>(0);
  const [totalMin, setTotalMin] = useState<number>(0);
  const [totalMax, setTotalMax] = useState<number>(0);

  const handleRange = () => {
    setSearchMin(currentMin);
    setSearchMax(currentMax);
  };

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const productsResponse = await getAllProducts();
      const productsData = productsResponse.data as Product[];

      setProducts(productsData);

      setIsLoading(false);
    };
    main();
  }, []);

  useEffect(() => {
    setIsFiltering(true);

    const filteredProducts = products
      .filter((product) =>
        categoryId ? product.posting.category._id === categoryId : true
      )
      .filter((product) =>
        productName
          ? product.name.toUpperCase().includes(productName.toUpperCase())
          : true
      );

    setFilteredProducts(filteredProducts);

    const min = filteredProducts.reduce((min, filteredProduct) => {
      return filteredProduct.price.value < min
        ? filteredProduct.price.value
        : min;
    }, 0);

    setCurrentMin(Math.floor(min / 100));
    setSearchMin(Math.floor(min / 100));
    setTotalMin(Math.floor(min / 100));

    const max = filteredProducts.reduce((max, filteredProduct) => {
      return max < filteredProduct.price.value
        ? filteredProduct.price.value
        : max;
    }, 0);

    setCurrentMax(Math.ceil(max / 100));
    setSearchMax(Math.ceil(max / 100));
    setTotalMax(Math.ceil(max / 100));

    setIsFiltering(false);
  }, [products, categoryId, productName]);

  useEffect(() => {
    setIsRanging(true);

    setRangedProducts(
      filteredProducts.filter((filteredProduct) => {
        return (
          searchMin <= filteredProduct.price.value / 100 &&
          filteredProduct.price.value / 100 <= searchMax
        );
      })
    );

    setIsRanging(false);
  }, [filteredProducts, searchMin, searchMax]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isLoading || isFiltering || isRanging ? (
          <Loader />
        ) : (
          <>
            <div className={styles.left}>
              <div>
                <Text weight="bold">Price</Text>
                <div className={styles["price-container"]}>
                  <Text weight="bold">${currentMin}</Text>
                  <Text weight="bold">-</Text>
                  <Text weight="bold">${currentMax}</Text>
                </div>
                <div className={styles["range-container"]}>
                  <Slider
                    min={totalMin}
                    max={totalMax}
                    onChange={(numbers) => {
                      if (typeof numbers !== "number") {
                        setCurrentMin(numbers[0]);
                        setCurrentMax(numbers[1]);
                      }
                    }}
                    range
                    style={{ margin: "0 16px" }}
                    styles={{
                      handle: {
                        borderColor: "#007185",
                        borderWidth: "8px",
                        height: "32px",
                        marginTop: "-14px",
                        opacity: 1,
                        width: "32px",
                      },
                      track: { backgroundColor: "#007185" },
                    }}
                    value={[currentMin, currentMax]}
                  />
                  <Button color="white" onClick={handleRange}>
                    Go
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div>
                <Text style={{ fontSize: "28px" }}>Results</Text>
                <Text color="grey">
                  Check each product page for other buying options.
                </Text>
              </div>
              <PostingGrid products={rangedProducts} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
