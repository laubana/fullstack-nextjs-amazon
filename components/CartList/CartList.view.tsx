"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./CartList.module.css";
import { CartListProps } from "./CartList.props";
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import { editCart, getAllCarts, removeCart } from "@/services/cart";
import { Cart, CartDeletePayload, CartEditPayload } from "@/types/Cart";

export default (props: CartListProps) => {
  const {} = props;

  const [carts, setCarts] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItemNumber, setTotalItemNumber] = useState<number>(0);

  const handleDelete = async (values: CartDeletePayload) => {
    const cartFormData = new FormData();
    cartFormData.append("cartId", values.cartId);
    const cartResponse = await removeCart(cartFormData);

    if (cartResponse.ok) {
      toast.success(cartResponse.message);
      setCarts((prevStates) =>
        prevStates.filter((prevState) => prevState._id !== values.cartId)
      );
    } else {
      toast.error(cartResponse.message);
    }
  };

  const handleEdit = async (values: CartEditPayload) => {
    const cartFormData = new FormData();
    cartFormData.append("cartId", values.cartId);
    cartFormData.append("quantity", values.quantity);
    const cartResponse = await editCart(cartFormData);

    if (cartResponse.ok) {
      toast.success(cartResponse.message);
      setCarts((prevStates) =>
        prevStates.map((prevState) =>
          prevState._id !== values.cartId
            ? prevState
            : { ...prevState, quantity: +values.quantity }
        )
      );
    } else {
      toast.error(cartResponse.message);
    }
  };

  const handleToggle = (
    event: ChangeEvent<HTMLInputElement>,
    cartId: string
  ) => {
    if (event.target.checked) {
      setCartIds((prevStates) => [...prevStates, cartId]);
    } else {
      setCartIds((prevStates) =>
        prevStates.filter((prevState) => prevState !== cartId)
      );
    }
  };

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const cartsResponse = await getAllCarts();

      const carts = cartsResponse.data as Cart[];

      setCarts(carts);

      setIsLoading(false);
    };
    main();
  }, []);

  useEffect(() => {
    setTotalPrice(
      cartIds.reduce((sum, cartId) => {
        const cart = carts.find((cart) => cart._id === cartId);

        const price = cart?.product.price.value ?? 0;
        const quantity = cart?.quantity ?? 0;

        return sum + +price * +quantity;
      }, 0)
    );
  }, [carts, cartIds]);

  useEffect(() => {
    setTotalItemNumber(
      carts.reduce((sum, cart) => {
        return sum + cart.quantity;
      }, 0)
    );
  }, [carts]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.left}>
            <Text style={{ fontSize: "28px" }}>Shopping Cart</Text>
            <div>
              {0 < carts.length ? (
                <>
                  {carts.map((cart) => (
                    <div className={styles["cart-container"]} key={cart._id}>
                      <div className={styles["checkbox-container"]}>
                        <input
                          type="checkbox"
                          onChange={(event) => handleToggle(event, cart._id)}
                        />
                      </div>
                      <CartCard
                        cartId={cart._id}
                        cartQuantity={cart.quantity}
                        description={cart.product.description}
                        images={cart.product.images}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        price={cart.product.price.value}
                        productQuantity={cart.product.quantity}
                        title={cart.product.description}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <Text color="grey">No items found.</Text>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles["price-container"]}>
              <Text style={{ fontSize: "18px" }}>
                Subtotal ({totalItemNumber} items):
              </Text>
              <Text style={{ fontSize: "18px" }} weight="bold">
                ${(totalPrice / 100).toFixed(2)}
              </Text>
            </div>
            <Button block>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};
