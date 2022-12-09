import React from "react";
import { Header } from "./Header";
import styles from "./styles.module.css";

type LayoutProps = {
  children: React.ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};
