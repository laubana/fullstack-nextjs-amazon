"use client";

import { useEffect, useState } from "react";

import styles from "./SaleList.module.css";
import { SaleListProps } from "./SaleList.props";

import Loader from "@/components//Loader";
import SaleCard from "@/components/SaleCard";
import Text from "@/components/Text";

import { getTransactions } from "@/controllers/transaction";

import { Transaction } from "@/types/Transaction";

export default (props: SaleListProps) => {
  const {} = props;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);

      const transactionsResponse = await getTransactions();
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
          <Text style={{ fontSize: "28px" }}>Your Sales</Text>
          <div className={styles["sale-list-container"]}>
            {0 < transactions.length ? (
              <>
                {transactions.map((transactionItem) => (
                  <SaleCard
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
