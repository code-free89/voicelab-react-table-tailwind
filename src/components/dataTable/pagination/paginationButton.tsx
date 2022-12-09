import React from "react";
import classNames from "classnames";
import styles from "./paginationButton.module.css";

type PaginationButtonProps = {
  page: number;
  isCurrentPage: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const PaginationButton = ({
  page,
  isCurrentPage,
  setCurrentPage,
}: PaginationButtonProps) => {
  return (
    <button
      className={classNames(
        styles.paginationButton,
        isCurrentPage ? styles.isCurrentItem : styles.noCurrentItem
      )}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  );
};
