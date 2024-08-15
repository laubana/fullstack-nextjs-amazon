import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./SaleCard.module.css";
import { SaleCardProps } from "./SaleCard.props";

import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Loader from "@/components/Loader";
import Text from "@/components/Text";

import { stringifyDate } from "@/helpers/date";

import { getSellerPurchases } from "@/controllers/purchase";

import { approveRefund, cancelRefund } from "@/services/refund";

import { Purchase } from "@/types/Purchase";

export default (props: SaleCardProps) => {
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

  const handleApprove = async (values: { purchaseId: string }) => {
    const { purchaseId } = values;

    setIsSubmitting(true);

    const approveRefundFormData = new FormData();
    approveRefundFormData.append("purchaseId", purchaseId);

    const approveRefundResponse = await approveRefund(approveRefundFormData);
    const requestRefundData = approveRefundResponse.data as Purchase;

    if (approveRefundResponse.ok) {
      setPurchases((prevStates) =>
        prevStates.map((prevState) => {
          if (prevState._id !== purchaseId) {
            return prevState;
          } else {
            return requestRefundData;
          }
        })
      );
      toast.success(approveRefundResponse.message);
    } else {
      toast.error(approveRefundResponse.message);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const purchasesFormData = new FormData();
      purchasesFormData.append("transactionId", transaction._id);

      const purchasesResponse = await getSellerPurchases(purchasesFormData);
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
                <div className={styles["action-list-container"]}>
                  {!purchase.refund ? null : purchase.refund &&
                    !purchase.refund.isApproved ? (
                    <>
                      <Button
                        block
                        onClick={() =>
                          handleApprove({
                            purchaseId: purchase._id,
                          })
                        }
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting ? (
                          <Loader disabled={isSubmitting} />
                        ) : (
                          "Approve Request"
                        )}
                      </Button>
                      <Button
                        block
                        color="white"
                        onClick={() =>
                          handleCancel({
                            purchaseId: purchase._id,
                          })
                        }
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting ? (
                          <Loader disabled={isSubmitting} />
                        ) : (
                          "Cancel Request"
                        )}
                      </Button>
                    </>
                  ) : (
                    <Text>Refunded</Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
