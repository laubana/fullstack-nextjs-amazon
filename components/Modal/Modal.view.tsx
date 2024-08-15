import React, { useRef } from "react";
import { FaXmark } from "react-icons/fa6";

import styles from "./Modal.module.css";
import { ModalProps } from "./Modal.props";

const ModalComponent = ({ visibility, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      {visibility && (
        <div
          className={styles["background-container"]}
          ref={ref}
          onClick={(event) => {
            if (event.target === ref.current) {
              onClose();
            }
          }}
        >
          <div className={styles["content-container"]}>
            <div className={styles["icon-container"]}>
              <FaXmark size={24} onClick={onClose} cursor="pointer" />
            </div>
            <div className={styles["children-container"]}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ModalComponent);
