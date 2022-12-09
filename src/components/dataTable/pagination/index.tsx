import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PaginationButton } from "./paginationButton";
import styles from "./index.module.css";

type PaginationProps = {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const Pagination = ({
  pages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const head: number[] = [];
  const tail: number[] = [];
  if (pages > 6) {
    const headStart: number =
      pages - currentPage < 4
        ? pages - 5
        : currentPage > 1
        ? currentPage - 1
        : 1;
    const headEnd: number =
      pages - currentPage < 4 ? pages : currentPage > 1 ? currentPage + 1 : 3;
    for (let i = headStart; i <= headEnd; i++) {
      head.push(i);
    }
    if (pages - currentPage > 3) {
      const tailStart: number = pages - 2;
      const tailEnd: number = pages;
      for (let i = tailStart; i <= tailEnd; i++) {
        tail.push(i);
      }
    }
  } else {
    for (let i = 1; i <= pages; i++) {
      head.push(i);
    }
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationContent}>
        <nav className={styles.paginationContentNav} aria-label="Pagination">
          <button
            className={styles.paginationContentNavButton}
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
          >
            <ChevronLeftIcon
              className={styles.paginationContentNavButtonIcon}
              aria-hidden="true"
            />
          </button>
          {head.map((item) => (
            <PaginationButton
              key={item}
              page={item}
              isCurrentPage={item === currentPage}
              setCurrentPage={setCurrentPage}
            />
          ))}
          {pages > 6 && pages - currentPage > 3 ? (
            <span className={styles.paginationContentNavSpan}>...</span>
          ) : null}
          {tail.map((item) => (
            <PaginationButton
              key={item}
              page={item}
              isCurrentPage={item === currentPage}
              setCurrentPage={setCurrentPage}
            />
          ))}
          <button
            className={styles.paginationContentNavButton}
            onClick={() =>
              setCurrentPage(currentPage < pages ? currentPage + 1 : pages)
            }
          >
            <ChevronRightIcon
              className={styles.paginationContentNavButtonIcon}
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>
    </div>
  );
};
