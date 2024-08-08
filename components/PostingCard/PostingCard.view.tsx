import styles from "./PostingCard.module.css";
import { PostingCardProps } from "./PostingCard.props";
import Carousel from "@/components/Carousel";
import Text from "@/components/Text";

export default (props: PostingCardProps) => {
  const { description, images, name, price } = props;

  return (
    <div style={{ minWidth: 0 }}>
      <Carousel
        items={images.map((image) => (
          <img className={styles.image} src={image} />
        ))}
      />
      <div className={styles.wrapper}>
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Text size="large">{description}</Text>
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
      </div>
    </div>
  );
};
