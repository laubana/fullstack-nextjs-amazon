import styles from "./PostingGrid.module.css";
import { PostingGridProps } from "./PostingGrid.props";

import PostingCard from "@/components/PostingCard";
import Text from "@/components/Text";

export default (props: PostingGridProps) => {
  const { products } = props;

  return (
    <div>
      {0 < products.length ? (
        <div className={styles.wrapper}>
          {products.map((product) => (
            <div className={styles["posting-container"]} key={product._id}>
              <PostingCard
                description={product.description}
                images={product.images}
                name={product.name}
                postingId={product.posting._id}
                productId={product._id}
                price={product.price.value.toString()}
              />
            </div>
          ))}
        </div>
      ) : (
        <Text color="grey">No items found.</Text>
      )}
    </div>
  );
};
