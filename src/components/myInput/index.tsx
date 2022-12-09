import React from "react";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import styles from "./index.module.css";

type InputProps = {
  type: string;
  className?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeHolder: string;
  iconPosition?: "head" | "tail";
  icon?: React.ReactNode;
};
export const MyInput = ({
  type,
  className,
  onChange,
  placeHolder,
  iconPosition,
  icon,
}: InputProps) => {
  const debounced = useDebouncedCallback((value) => {
    onChange(value);
  }, 500);
  return (
    <div
      className={classNames(
        "relative h-10 w-36 rounded-md bg-white",
        className
      )}
    >
      <input
        type={type}
        onChange={(e) => debounced(e.target.value)}
        className={classNames(
          styles.input,
          !!icon
            ? iconPosition && iconPosition === "head"
              ? "pl-8"
              : "pr-8"
            : ""
        )}
        placeholder={placeHolder}
        aria-invalid="true"
        aria-describedby="email-error"
      />
      {!!icon && (
        <div
          className={classNames(
            styles.icon,
            iconPosition && iconPosition === "head"
              ? "left-0 pl-3"
              : "right-0 pr-3"
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
