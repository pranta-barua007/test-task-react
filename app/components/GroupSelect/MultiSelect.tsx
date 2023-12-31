"use client";

import { type Sector } from "@/app/types/types";
import React from "react";

import styles from "./multiSelect.module.css";
import axios from "axios";
import RightIcon from "@/app/ui/RightIcon";

type IMultiSelect = {
  option: Sector;
  isOpen?: boolean;
  index?: number;
  highlightedIndex: number;
  onClickHandler: (v: any) => void;
  setIsOpen: (v: false) => void;
  isOptionSelected: (v: Sector) => boolean;
  setHighlightedIndex: (v: number) => void;
};

function MultiSelect({
  option,
  highlightedIndex,
  setHighlightedIndex,
  onClickHandler,
  setIsOpen,
  isOptionSelected,
}: IMultiSelect) {
  const [hasMoreData, setHasMoreData] = React.useState<Sector[]>([]);

  const fetchMore = async (sectorId: number | string) => {
    const req = axios.get(`/api/sectors/${sectorId}`);
    return (await req).data as Sector;
  };

  React.useEffect(() => {
    option.subSectors &&
      option.subSectors.length > 0 &&
      setHasMoreData(option.subSectors);
  }, [option.subSectors]);

  return (
    <li
      onClick={async (e) => {
        e.stopPropagation();
        if (option.hasNext && !option.subSectors) {
          const data = await fetchMore(option.id);
          if (data.subSectors) {
            console.log({data})
            setHasMoreData(data.subSectors);
          }
        }
        !option.hasNext && onClickHandler(option);
        !option.hasNext && setIsOpen(false);
      }}
      onMouseEnter={() => setHighlightedIndex(option.value as number)}
      key={option.value}
      className={`${styles.option} ${
        isOptionSelected(option) ? styles.selected : ""
      } ${option.value === highlightedIndex ? styles.highlighted : ""}`}
    >
      <span>{option.name}&nbsp;{option.hasNext && !option.subSectors ? <RightIcon /> : null}</span>
      {hasMoreData && (
        <ul>
          {hasMoreData.map((sector, _index) => {
            return (
              <MultiSelect
                key={sector.value}
                option={sector}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                onClickHandler={onClickHandler}
                setIsOpen={setIsOpen}
                isOptionSelected={isOptionSelected}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default MultiSelect;