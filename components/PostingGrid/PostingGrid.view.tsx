import Link from "next/link";
import styles from "./PostingGrid.module.css";
import { PostingGridProps } from "./PostingGrid.props";
import PostingCard from "@/components/PostingCard";

export default (props: PostingGridProps) => {
  const { products = [] } = props;

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div className={styles["posting-container"]} key={product._id}>
          <Link href={`/postings/${product.posting._id}`}>
            <PostingCard
              description={product.description}
              images={product.images}
              name={product.name}
              price={product.price.value.toString()}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
