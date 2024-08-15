"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./PostingCard.module.css";
import { PostingCardProps } from "./PostingCard.props";

import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Text from "@/components/Text";

import { addCart } from "@/controllers/cart";

export default (props: PostingCardProps) => {
  const { description, images, name, postingId, productId, price } = props;

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdd = async () => {
    if (productId) {
      setIsAdding(true);

      const cartFormData = new FormData();
      cartFormData.append("productId", productId);
      cartFormData.append("quantity", "1");

      const cartResponse = await addCart(cartFormData);

      if (cartResponse.ok) {
        toast.success(cartResponse.message);
      } else {
        toast.error(cartResponse.message);
      }

      setIsAdding(false);
    }
  };

  return (
    <div style={{ minWidth: 0 }}>
      <Carousel
        items={images.map((image) => (
          <img className={styles.image} src={image} />
        ))}
      />
      <div className={styles.wrapper}>
        {postingId ? (
          <Link href={`/postings/${postingId}`}>
            <Text size="large" weight="bold">
              {name}
            </Text>
            <Text size="large">{description}</Text>
          </Link>
        ) : (
          <>
            <Text size="large" weight="bold">
              {name}
            </Text>
            <Text size="large">{description}</Text>
          </>
        )}
        <div className={styles["price-container"]}>
          <Text style={{ fontSize: "13px" }}>$</Text>
          <Text style={{ fontSize: "28px", lineHeight: 1 }}>
            {(+price / 100)
              .toFixed(2)
              .substring(0, (+price / 100).toFixed(2).indexOf("."))}
          </Text>
          <Text style={{ fontSize: "13px" }}>
            {(+price / 100)
              .toFixed(2)
              .substring((+price / 100).toFixed(2).indexOf(".") + 1)}
          </Text>
        </div>
        {productId ? (
          <div>
            <Button color="yellow" onClick={handleAdd} disabled={isAdding}>
              Add to Cart
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
