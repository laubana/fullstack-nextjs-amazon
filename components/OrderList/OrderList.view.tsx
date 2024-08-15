"use client";

import { useEffect, useState } from "react";

import styles from "./OrderList.module.css";
import { OrderListProps } from "./OrderList.props";

import OrderCard from "@/components/OrderCard";
import Loader from "@/components//Loader";
import Text from "@/components/Text";

import { getAllTransactions } from "@/controllers/transaction";

import { Transaction } from "@/types/Transaction";

export default (props: OrderListProps) => {
  const {} = props;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const transactionsResponse = await getAllTransactions();
      const transactionsData = transactionsResponse.data as Transaction[];

      if (transactionsResponse.ok) {
        setTransactions(transactionsData);
      }

      setIsLoading(false);
    };
    main();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text style={{ fontSize: "28px" }}>Your Orders</Text>
          <div className={styles["order-list-container"]}>
            {0 < transactions.length ? (
              <>
                {transactions.map((transactionItem) => (
                  <OrderCard
                    key={transactionItem._id}
                    transaction={transactionItem}
                  />
                ))}
              </>
            ) : (
              <Text color="grey">No items found.</Text>
            )}
          </div>
        </>
      )}
    </div>
  );
};
