import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import styles from "./index.module.css";

type MySelectProps = {
  className?: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MySelect = ({
  className,
  items,
  selectedItems,
  setSelectedItems,
}: MySelectProps) => {
  const selectedChange = (changedItem: string) => {
    if (selectedItems.includes(changedItem)) {
      setSelectedItems([
        ...selectedItems.filter((item) => item !== changedItem),
      ]);
    } else {
      selectedItems.push(changedItem);
      setSelectedItems([...selectedItems]);
    }
  };

  return (
    <Listbox value="Species" onChange={selectedChange}>
      {({ open }) => (
        <>
          <div className={styles.listBox}>
            <Listbox.Button className={styles.listBoxButton}>
              <span className={styles.listBoxButtonLabel}>Species</span>
              <span className={styles.listBoxButtonSpan}>
                <ChevronDownIcon
                  className={styles.listBoxButtonIcon}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={styles.listBoxOptions}>
                {items.map((item: string, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        styles.listBoxOption,
                        active
                          ? "text-white bg-indigo-600"
                          : "text-primary-anthracite-80"
                      )
                    }
                    value={item}
                  >
                    {({ active }) => (
                      <>
                        <span
                          className={classNames(
                            styles.listBoxSelectedOptionSpan,
                            selectedItems.includes(item)
                              ? "font-semibold"
                              : "font-normal"
                          )}
                        >
                          {item}
                        </span>

                        {selectedItems.includes(item) ? (
                          <span
                            className={classNames(
                              styles.listBoxSelectedOption,
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
