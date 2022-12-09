import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { dataType } from "../../interface/dataType";
import { Status } from "./status";
import { Tooltip } from "../tooltip";
import { Pagination } from "./pagination";
import styles from "./index.module.css";

type dataTableProps = {
  className?: string;
  isCheckable?: boolean;
  header: string[];
  tableData: dataType[];
  isPagination: boolean;
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DataTable = ({
  className,
  isCheckable,
  header,
  tableData,
  isPagination,
  pages,
  currentPage,
  setCurrentPage,
}: dataTableProps) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    changeAllChecked(false);
  }, [tableData]);

  const changeAllChecked = (checked: boolean) => {
    if (checked) {
      const checkedItemArray: number[] = [];
      tableData.map((item) => checkedItemArray.push(item.id));
      setCheckedItems([...checkedItemArray]);
    } else {
      const emptyArray: number[] = [];
      setCheckedItems([...emptyArray]);
    }
  };

  const changeCheckedById = (id: number, checked: boolean) => {
    if (checked) {
      checkedItems.push(id);
      if (checkedItems.length === tableData.length) {
        changeAllChecked(true);
      }
      setCheckedItems([...checkedItems]);
    } else {
      setCheckedItems([...checkedItems.filter((item) => item !== id)]);
    }
  };

  return (
    <React.Fragment>
      <table className={classNames(styles.table, className)}>
        <thead>
          <tr className={styles.tableTheadTr}>
            {isCheckable && (
              <th>
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className={styles.tableThCheck}
                  onChange={(e) => changeAllChecked(e.target.checked)}
                  checked={
                    tableData.length > 0 &&
                    checkedItems.length === tableData.length
                  }
                />
              </th>
            )}
            {header.map((headerItem, index) => (
              <th key={index} className={styles.tableTh}>
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr
              key={item.id}
              className={classNames(
                styles.tableTbodyTr,
                item.status === "unknown" ? "bg-secondary-blue-pale-5" : ""
              )}
            >
              <td className={styles.tableTdCheck}>
                <input
                  checked={checkedItems.includes(item.id) ? true : false}
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className={styles.tableTdCheckInput}
                  onChange={(e) => {
                    changeCheckedById(item.id, e.target.checked);
                  }}
                />
              </td>
              <td>
                <h4 className={styles.tableTdName}>{item.name}</h4>
                <span className={styles.tableTdSpecies}>{item.species}</span>
              </td>
              <td>
                <img src={item.image} className={styles.tableTdImg} />
              </td>
              <td>
                {item.origin.name.length > 24 ? (
                  <Tooltip text={item.origin.name}>
                    {`${item.origin.name.substring(0, 24)}...`}
                  </Tooltip>
                ) : (
                  item.origin.name
                )}
              </td>
              <td>{item.gender}</td>
              <td>
                <Status text={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPagination && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </React.Fragment>
  );
};
