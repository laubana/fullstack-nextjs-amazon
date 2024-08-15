import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./OrderCard.module.css";
import { OrderCardProps } from "./OrderCard.props";

import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import CreditCard from "@/components/CreditCard";
import Loader from "@/components/Loader";
import Text from "@/components/Text";

import { stringifyDate } from "@/helpers/date";

import { getBuyerPurchases } from "@/controllers/purchase";

import { cancelRefund, requestRefund } from "@/services/refund";

import { Purchase } from "@/types/Purchase";

export default (props: OrderCardProps) => {
  const { transaction } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const totalPrice = purchases.reduce((sum, purchase) => {
    return sum + purchase.product.price.value * purchase.quantity;
  }, 0);

  const handleCancel = async (values: { purchaseId: string }) => {
    const { purchaseId } = values;

    setIsSubmitting(true);

    const cancelRefundFormData = new FormData();
    cancelRefundFormData.append("purchaseId", purchaseId);

    const cancelRefundResponse = await cancelRefund(cancelRefundFormData);
    const cancelRefundData = cancelRefundResponse.data as Purchase;

    if (cancelRefundResponse.ok) {
      setPurchases((prevStates) =>
        prevStates.map((prevState) => {
          if (prevState._id !== purchaseId) {
            return prevState;
          } else {
            return cancelRefundData;
          }
        })
      );
      toast.success(cancelRefundResponse.message);
    } else {
      toast.error(cancelRefundResponse.message);
    }

    setIsSubmitting(false);
  };

  const handleRequest = async (values: { purchaseId: string }) => {
    const { purchaseId } = values;

    setIsSubmitting(true);

    const requestRefundFormData = new FormData();
    requestRefundFormData.append("purchaseId", purchaseId);

    const requestRefundResponse = await requestRefund(requestRefundFormData);
    const requestRefundData = requestRefundResponse.data as Purchase;

    if (requestRefundResponse.ok) {
      setPurchases((prevStates) =>
        prevStates.map((prevState) => {
          if (prevState._id !== purchaseId) {
            return prevState;
          } else {
            return requestRefundData;
          }
        })
      );
      toast.success(requestRefundResponse.message);
    } else {
      toast.error(requestRefundResponse.message);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const purchasesFormData = new FormData();
      purchasesFormData.append("transactionId", transaction._id);

      const purchasesResponse = await getBuyerPurchases(purchasesFormData);
      const purchasesData = purchasesResponse.data as Purchase[];

      if (purchasesResponse.ok) {
        setPurchases(purchasesData);
      }

      setIsLoading(false);
    };
    main();
  }, [transaction]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles["header-container"]}>
            <div>
              <Text color="grey">ORDER PLACED</Text>
              <Text>{stringifyDate(new Date(transaction.createdAt))}</Text>
            </div>
            <div>
              <Text color="grey">TOTAL</Text>
              <Text>${(totalPrice / 100).toFixed(2)}</Text>
            </div>
            <div>
              <Text color="grey">PAYMENT METHOD</Text>
              <CreditCard brand="visa" last4="1234" />
            </div>
          </div>
          <div className={styles["body-container"]}>
            {purchases.map((purchase) => (
              <div className={styles["purchase-container"]} key={purchase._id}>
                <div
                  className={styles["purchase-left-container"]}
                  key={purchase._id}
                >
                  <div className={styles["images-container"]}>
                    <Carousel
                      items={purchase.product.images.map((image) => (
                        <img className={styles.image} key={image} src={image} />
                      ))}
                    />
                  </div>
                  <div>
                    <Link href={`/postings/${purchase.product.posting._id}`}>
                      <Text color="teal">{purchase.product.posting.title}</Text>
                    </Link>
                  </div>
                </div>
                {!purchase.refund ||
                (purchase.refund && !purchase.refund.isApproved) ? (
                  <div>
                    <Button
                      color={purchase.refund ? "white" : undefined}
                      onClick={() =>
                        purchase.refund
                          ? handleCancel({
                              purchaseId: purchase._id,
                            })
                          : handleRequest({
                              purchaseId: purchase._id,
                            })
                      }
                      disabled={isSubmitting}
                    >
                      {purchase.refund ? "Cancel Refund" : "Request Refund"}
                    </Button>
                  </div>
                ) : (
                  <Text>Refunded</Text>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
