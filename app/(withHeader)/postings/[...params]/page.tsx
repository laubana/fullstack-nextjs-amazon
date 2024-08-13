import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import CartForm from "@/components/CartForm";
import Text from "@/components/Text";
import { getProducts } from "@/services/product";
import { Product } from "@/types/Product";

export default async ({ params }: { params: { params: string[] } }) => {
  const postingId = params.params[0];
  const productId = params.params[1];

  if (!postingId) {
    redirect("/");
  }

  const productsFormData = new FormData();
  productsFormData.append("postingId", postingId);
  const productsResponse = await getProducts(productsFormData);

  const products = productsResponse.data as Product[];

  if (!products || products.length === 0) {
    redirect("/");
  }

  const product =
    products.find((product) => product._id === productId) ?? products[0];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Carousel
            items={product.images.map((image) => (
              <img className={styles.image} key={image} src={image} />
            ))}
          />
        </div>
        <div className={styles.center}>
          <Text style={{ fontSize: "24px" }}>{product.name}</Text>
          <div className={styles["price-container"]}>
            <Text style={{ fontSize: "13px" }}>$</Text>
            <Text style={{ fontSize: "28px", lineHeight: 1 }}>
              {(+product.price.value / 100)
                .toFixed(2)
                .substring(
                  0,
                  (+product.price.value / 100).toFixed(2).indexOf(".")
                )}
            </Text>
            <Text style={{ fontSize: "13px" }}>
              {(+product.price.value / 100)
                .toFixed(2)
                .substring(
                  (+product.price.value / 100).toFixed(2).indexOf(".") + 1
                )}
            </Text>
          </div>
          <div className={styles["products-container"]}>
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/postings/${postingId}/${product._id}`}
              >
                <img
                  src={product.images[0]}
                  style={{
                    aspectRatio: 1,
                    border: "1px solid red",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </Link>
            ))}
          </div>
          <Text>{product.description}</Text>
        </div>
        <div className={styles.right}>
          <CartForm productId={product._id} quantity={product.quantity} />
        </div>
      </div>
    </div>
  );
};
