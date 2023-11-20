"use client";

import { useEffect, useState } from "react";
import { type Sector } from "@/app/types/types";
import MultiSelect from "./MultiSelect";

import styles from "./groupSelect.module.css";

type MultipleSelectProps = {
  multiple: true;
  value: Sector[];
  onChange: (value: Sector[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: Sector;
  onChange: (value: Sector | undefined) => void;
};

type SelectProps = {
  options: Sector[];
  label: string;
  errorMessage?: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function GroupSelect({
  multiple,
  value,
  onChange,
  options,
  label,
  errorMessage,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: Sector) {
    if (multiple) {
      //console.log({value, option, is: value.includes(option, option.value as number)})
      // for(const item of value) {
      //   console.log({item, option})
      //   if(item.id === option.id) {
      //     console.log('includes')
      //     onChange(value.filter((o) => o.id !== option.id));
      //   }else {
      //     onChange([...value, option]);
      //   }
      // }
      if (value.includes(option)) {
        //console.log('includes', value.filter((o) => o.id !== option.id))
        onChange(value.filter((o) => o.id !== option.id));
      } else {
        //console.log('NoT-includes')
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: Sector) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div>
      <p className={`${styles['label']} ${errorMessage ? styles["error"] : ""}`}>{errorMessage ? errorMessage : label}</p>
      <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={styles["option-badge"]}
                >
                  {v.name}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.name}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <MultiSelect
              key={option.value}
              option={option}
              index={index}
              highlightedIndex={highlightedIndex}
              onClickHandler={selectOption}
              setIsOpen={setIsOpen}
              isOptionSelected={isOptionSelected}
              setHighlightedIndex={setHighlightedIndex}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
