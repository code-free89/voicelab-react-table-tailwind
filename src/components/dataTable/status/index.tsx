import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type statusProps = {
  text: "Alive" | "unknown" | "Dead";
};
export const Status = ({ text }: statusProps) => {
  return (
    <div
      className={classNames(
        "flex",
        text === "unknown" ? "text-primary-anthracite-70" : ""
      )}
    >
      {text === "Alive" && (
        <CheckCircleIcon
          className="h-[22px] w-[22px] text-alive-icon mr-2"
          aria-hidden="true"
        />
      )}
      {text === "unknown" && (
        <QuestionMarkCircleIcon
          className="h-[22px] w-[22px] text-secondary-blue-pale-40 mr-2"
          aria-hidden="true"
        />
      )}
      {text === "Dead" && (
        <div className="h-[18px] w-[18px] border-2 border-solid border-saturated-red-100 rounded-full mr-2 text-center items-center font-black text-[10px] text-saturated-red-100">
          !
        </div>
      )}
      {text}
    </div>
  );
};
