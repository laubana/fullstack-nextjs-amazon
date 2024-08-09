"use client";

import { useState } from "react";
import styles from "./CartCard.module.css";
import { CartCardProps } from "./CartCard.props";
import AutoComplete from "@/components/AutoComplete";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Text from "@/components/Text";
import { Option } from "@/types/Option";

export default (props: CartCardProps) => {
  const {
    cartId,
    cartQuantity,
    description,
    images,
    onDelete,
    onEdit,
    price,
    productQuantity,
    title,
  } = props;

  const [inputCartQuantity, setInputcartQuantity] = useState<string>(
    cartQuantity.toString()
  );

  const handleDelete = () => {
    onDelete({ cartId });
  };

  const handleEdit = (option: Option | undefined) => {
    if (option?.value && inputCartQuantity !== option.value) {
      setInputcartQuantity(option.value);
      onEdit({ cartId, quantity: option.value });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Carousel
          items={images.map((image) => (
            <img className={styles.image} src={image} />
          ))}
        />
      </div>
      <div className={styles.center}>
        <div>
          <Text style={{ fontSize: "18px" }}>{title}</Text>
          {productQuantity === 0 ? (
            <Text color="red" size="small">
              Out of Stock
            </Text>
          ) : (
            <>
              <Text color="green" size="small">
                In Stock
              </Text>
            </>
          )}
          <Text color="grey">{description}</Text>
        </div>
        <div className={styles["controller-container"]}>
          <div className={styles["quantity-container"]}>
            <AutoComplete
              option={{
                label: cartQuantity.toString(),
                value: cartQuantity.toString(),
              }}
              options={Array.from(
                { length: productQuantity },
                (_, i) => productQuantity - i
              )
                .map((quantity) => ({
                  label: quantity.toString(),
                  value: quantity.toString(),
                }))
                .reverse()}
              setOption={handleEdit}
            />
          </div>
          <Text color="light-grey">|</Text>
          <Button color="white" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        <Text alignment="right" style={{ fontSize: "18px" }} weight="bold">
          ${(price / 100).toFixed(2)}
        </Text>
      </div>
    </div>
  );
};
